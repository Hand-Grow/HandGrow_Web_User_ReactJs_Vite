'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  X,
  Megaphone,
  Sprout,
  Image as ImageIcon,
  Loader2,
  Plus,
} from 'lucide-react';

import { Post, PostType } from '@/src/types';
import { feedService } from '@/src/services/feedService';
import { authService } from '@/src/services/authService';
import { fileService } from '@/src/services/fileService';
import { PRODUCE_LABELS, PRODUCE_VALUES, ProduceType } from '@/src/constants';
import toast from 'react-hot-toast';
import { t } from 'i18next';

interface CreatePostModalProps {
  onClose: () => void;
  onCreate: (post: Post) => void;
}

export default function CreatePostModal({
  onClose,
  onCreate,
}: CreatePostModalProps) {
  const [type, setType] = useState<PostType>('ANNOUNCEMENT');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [productName, setProductName] = useState<ProduceType>('RICE');
  const [expectedDate, setExpectedDate] = useState('');

  const [attachments, setAttachments] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [coopId, setCoopId] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const user = await authService.getProfile();
      setCoopId(user.id);
    };
    loadProfile();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);

      const file = files[0];

      const url = await fileService.uploadFile(file);

      setAttachments((prev) => [...prev, url]);
    } catch (_) {
      toast.error(t('FEED.ERROR_IMAGE'));
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);

      let newPost: Post;

      if (type === 'ANNOUNCEMENT') {
        newPost = await feedService.createAnnouncement(coopId, {
          title,
          content,
          attachments,
        });
      } else {
        if (!expectedDate) return;

        newPost = await feedService.createCampaign(coopId, {
          title: title || PRODUCE_LABELS[productName],
          productName,
          expectedDate,
          content,
          attachments,
        });
      }

      onCreate(newPost);
      onClose();
    } catch (_) {
      toast.error(t('FEED.ERROR_LOAD'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-105 max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('FEED.CREATE_POST')}</h2>

          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        {/* TYPE */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setType('ANNOUNCEMENT')}
            className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-sm
              ${
                type === 'ANNOUNCEMENT'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
          >
            <Megaphone size={16} />
            {t('FEED.ANNOUNCEMENT')}
          </button>

          <button
            onClick={() => setType('CAMPAIGN')}
            className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-sm
              ${
                type === 'CAMPAIGN'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
          >
            <Sprout size={16} />
            {t('FEED.CAMPAIGN')}
          </button>
        </div>

        {/* TITLE */}
        <div>
          <label className="text-sm text-gray-500">
            {t('FEED.TITLE_POST')}
          </label>

          <input
            placeholder={t('FEED.TITLE_POST_PLACEHOLDER')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* CAMPAIGN EXTRA */}
        {type === 'CAMPAIGN' && (
          <>
            <div>
              <label className="text-sm text-gray-500">
                {t('FEED.PRODUCT')}
              </label>

              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value as ProduceType)}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500"
              >
                {PRODUCE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {PRODUCE_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                {t('FEED.EXPECTED_DATE')}
              </label>

              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {/* CONTENT */}
        <div>
          <label className="text-sm text-gray-500">{t('FEED.CONTENT')}</label>

          <textarea
            rows={4}
            placeholder={t('FEED.CONTENT_PLACEHOLDER')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {t('FEED.ATTACHMENTS')}
            </span>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1 text-sm text-green-600 hover:underline"
            >
              {uploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} />
              )}
              {t('FEED.ADD_IMAGE')}
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {/* PREVIEW */}
          {attachments.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {attachments.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    className="w-full h-24 object-cover rounded-lg"
                  />

                  <button
                    onClick={() => removeAttachment(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {t('CANCEL')}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? t('FEED.UPLOADING') : t('FEED.POST')}
          </button>
        </div>
      </div>
    </div>
  );
}
