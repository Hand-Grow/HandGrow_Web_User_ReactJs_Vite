'use client';

import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';

import {
  ThumbsUp,
  MessageCircle,
  ShoppingCart,
  Sprout,
  Flame,
  CornerDownRight,
  Calendar,
} from 'lucide-react';

import { feedService } from '@/src/services/feedService';
import { CommentResponse, Post, PostType } from '@/src/types';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants';
import PublishCampaignModal from './PublishCampaignModal';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface FeedCardProps {
  item: Post;
  setFeed: Dispatch<SetStateAction<Post[]>>;
}

interface Campaign {
  id: string;
  collectedQuantity: number;
}

type ApiType = 'announcement' | 'campaign';

// ===== Time helper =====
function timeAgo(dateString: string, t: TFunction) {
  const now = new Date();
  const date = new Date(
    dateString.endsWith('Z') ? dateString : dateString + 'Z'
  );

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) return t('FEED.TIME.JUST_NOW');
  if (minutes < 60) return t('FEED.TIME.MINUTES_AGO', { count: minutes });
  if (hours < 24) return t('FEED.TIME.HOURS_AGO', { count: hours });
  if (days < 7) return t('FEED.TIME.DAYS_AGO', { count: days });

  return date.toLocaleDateString();
}

export default function FeedCard({ item, setFeed }: FeedCardProps) {
  const { t } = useTranslation();

  const [comment, setComment] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const postType: PostType =
    item.type === 'CAMPAIGN' ? 'CAMPAIGN' : 'ANNOUNCEMENT';

  const apiType: ApiType =
    postType === 'ANNOUNCEMENT' ? 'announcement' : 'campaign';

  const typeConfig: Record<PostType, { label: string; color: string }> = {
    ANNOUNCEMENT: {
      label: t('FEED.FILTER.ANNOUNCEMENT'),
      color: 'bg-red-100 text-red-600',
    },
    CAMPAIGN: {
      label: t('FEED.FILTER.CAMPAIGN'),
      color: 'bg-green-100 text-green-700',
    },
  };

  const config = typeConfig[postType];

  const productLabel =
    postType === 'CAMPAIGN'
      ? (PRODUCE_LABELS[(item.productName || item.title) as ProduceType] ??
        (item.productName || item.title))
      : item.title;

  const isRecent =
    Date.now() - new Date(item.createdAt).getTime() < 24 * 60 * 60 * 1000;

  // ===== Like =====
  const handleLike = async () => {
    try {
      await feedService.toggleLike(apiType, item.id);

      setFeed((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                liked: !p.liked,
                likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ===== Load comments =====
  const loadComments = useCallback(async () => {
    try {
      setLoadingComment(true);
      const res = await feedService.getComments(apiType, item.id);
      setComments(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComment(false);
    }
  }, [apiType, item.id]);

  useEffect(() => {
    if (showComments) loadComments();
  }, [showComments, loadComments]);

  // ===== Comment =====
  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const newComment = await feedService.postComment(
        apiType,
        item.id,
        comment
      );

      setComments((prev) => [...prev, newComment]);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const images = item.attachments ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="p-5 space-y-3 relative">
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-medium ${config.color}`}
        >
          {config.label}
        </span>
        {isRecent && (
          <span className="absolute top-4 left-4 flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            <Flame size={14} />
            {t('FEED.NEW')}
          </span>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
            <Sprout size={18} />
          </div>

          <div>
            <p className="font-semibold text-gray-800">{t('FEED.TITLE')}</p>
            <p className="text-xs text-gray-400">
              {timeAgo(item.createdAt, t)}
            </p>
          </div>
        </div>

        {/* Campaign */}
        {postType === 'CAMPAIGN' ? (
          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            <div className="text-green-700 font-semibold text-lg">
              {productLabel}
            </div>

            {item.content && (
              <p className="text-sm text-gray-700">{item.content}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-green-600" />
              {t('FEED.EXPECTED_CAMPAIGN')}
              <span className="font-semibold text-green-700">
                {item.expectedDate
                  ? new Date(
                      item.expectedDate + 'T00:00:00'
                    ).toLocaleDateString('vi-VN')
                  : 'N/A'}
              </span>
            </div>

            {/* Quantity */}
            <div className="text-sm text-gray-600">
              {t('FEED.COLLECTED')}:{' '}
              <span className="font-semibold">
                {item.totalQuantity ?? 0} {t('COMMON.UNIT.KG')}
              </span>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700">{item.content}</p>
          </>
        )}
      </div>

      {/* Image */}
      {images.length > 0 && (
        <img
          src={images[0]}
          alt="attachment"
          className="w-full max-h-105 object-cover"
        />
      )}

      {/* ===== Actions ===== */}
      <div className="px-5 py-3 flex items-center justify-between text-sm border-t">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
            item.liked ? 'text-blue-600 font-semibold' : 'hover:bg-gray-100'
          }`}
        >
          <ThumbsUp size={16} />
          {item.likeCount}
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
        >
          <MessageCircle size={16} />
          {item.commentCount}
        </button>

        {/* Publish */}
        {postType === 'CAMPAIGN' && (
          <button
            onClick={() =>
              setSelectedCampaign({
                id: item.id,
                collectedQuantity: item.totalQuantity ?? 0,
              })
            }
            disabled={item.published || item.totalQuantity <= 0}
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-lg transition ${
              item.published
                ? 'bg-gray-300 text-gray-600'
                : item.totalQuantity <= 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <ShoppingCart size={16} />
            {item.published ? t('FEED.PUBLISHED') : t('FEED.PUBLISH')}
          </button>
        )}
      </div>

      {/* ===== Comments ===== */}
      {showComments && (
        <div className="px-5 pb-5 space-y-3 border-t">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                <Sprout size={14} />
              </div>

              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm">
                  <p className="font-semibold text-xs text-gray-800">
                    {c.farmerName}
                  </p>
                  <p>{c.content}</p>
                </div>

                <button className="text-xs text-gray-500 flex items-center gap-1 mt-1 hover:text-blue-600">
                  <CornerDownRight size={12} />
                  {t('FEED.REPLY')}
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
              placeholder={t('FEED.WRITE_COMMENT')}
            />

            <button
              onClick={handleComment}
              className="text-blue-600 text-sm font-semibold"
            >
              {t('FEED.SEND')}
            </button>
          </div>
        </div>
      )}

      {/* ===== Modal ===== */}
      {selectedCampaign && (
        <PublishCampaignModal
          campaignId={selectedCampaign.id}
          collectedQuantity={selectedCampaign.collectedQuantity}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={() => {
            setFeed((prev) =>
              prev.map((p) =>
                p.id === selectedCampaign.id ? { ...p, published: true } : p
              )
            );
          }}
        />
      )}
    </div>
  );
}
