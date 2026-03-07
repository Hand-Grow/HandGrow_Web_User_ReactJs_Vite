'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  ShoppingCart,
  Sprout,
  Flame,
} from 'lucide-react';

import { CommentResponse, feedService } from '@/services/feedService';
import { Post, PostType } from '@/src/types';

import { PRODUCE_LABELS, ProduceType } from '@/constants';
import PublishCampaignModal from './PublishCampaignModal';

interface FeedCardProps {
  item: Post;
  setFeed: Dispatch<SetStateAction<Post[]>>;
}

type ApiType = 'announcement' | 'campaign';

const typeConfig: Record<PostType, { label: string; color: string }> = {
  ANNOUNCEMENT: {
    label: '📢 Thông báo',
    color: 'bg-red-100 text-red-600',
  },
  CAMPAIGN: {
    label: ' Thu gom',
    color: 'bg-green-100 text-green-700',
  },
};

export default function FeedCard({ item, setFeed }: FeedCardProps) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const postType: PostType =
    item.type === 'CAMPAIGN' ? 'CAMPAIGN' : 'ANNOUNCEMENT';

  const apiType: ApiType =
    postType === 'ANNOUNCEMENT' ? 'announcement' : 'campaign';

  const config = typeConfig[postType];

  const productLabel = PRODUCE_LABELS[item.title as ProduceType] ?? item.title;

  const isRecent =
    Date.now() - new Date(item.createdAt).getTime() < 24 * 60 * 60 * 1000;

  const formatDate = (text: string) => {
    const dateStr = text.replace('Ngày dự kiến: ', '');
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

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

  const loadComments = async () => {
    try {
      setLoadingComment(true);

      const res = await feedService.getComments(apiType, item.id);

      setComments(res?.content ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    if (showComments) loadComments();
  }, [showComments]);

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

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition border overflow-hidden">
      {/* HEADER */}
      <div className="p-5 space-y-3 relative">
        {/* TYPE */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-medium ${config.color}`}
        >
          {config.label}
        </span>

        {/* RECENT BADGE */}
        {isRecent && (
          <span className="absolute top-4 left-4 flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            <Flame size={14} />
            Mới
          </span>
        )}

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center">
            <Sprout size={18} />
          </div>

          <div>
            <p className="font-semibold text-gray-800">Hợp tác xã</p>

            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        {postType === 'CAMPAIGN' ? (
          <div className="bg-green-50 p-3 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-green-700 font-medium">
              🌱 {productLabel}
            </div>

            <p className="text-sm text-gray-700">
              HTX muốn thu gom sản phẩm này vào ngày
              <span className="font-semibold text-green-700 ml-1">
                {formatDate(item.content)}
              </span>
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed">
              {item.content}
            </p>
          </>
        )}
      </div>

      {/* IMAGE */}
      {item?.image && (
        <img
          src={item.image}
          alt="post"
          className="w-full max-h-[420px] object-cover"
        />
      )}

      {/* ACTION AREA */}
      <div className="p-4 space-y-3">
        {/* SELL BUTTON */}
        {postType === 'CAMPAIGN' && (
          <button
            onClick={() => setPublishOpen(true)}
            disabled={item.isPublished}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition
      ${
        item.isPublished
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      }
    `}
          >
            <ShoppingCart size={16} />
            {item.isPublished ? 'Đã đăng Marketplace' : 'Đăng bán sản phẩm'}
          </button>
        )}
        {/* ACTIONS */}
        <div className="flex justify-between border-t pt-3 text-sm">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
              item.liked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsUp size={16} />
            {item.likeCount}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            <MessageCircle size={16} />
            {item.commentCount}
          </button>
        </div>

        {/* COMMENTS */}
        {showComments && (
          <div className="space-y-2 pt-2 border-t">
            {loadingComment && (
              <p className="text-sm text-gray-400">Đang tải bình luận...</p>
            )}

            {!loadingComment && comments.length === 0 && (
              <p className="text-sm text-gray-400">Chưa có bình luận</p>
            )}

            {comments.map((c) => (
              <div key={c.id} className="bg-gray-100 p-2 rounded-lg text-sm">
                <strong>{c.authorName}:</strong> {c.content}
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Viết bình luận..."
              />

              <button
                onClick={handleComment}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
              >
                Gửi
              </button>
            </div>
          </div>
        )}
      </div>
      {publishOpen && (
        <PublishCampaignModal
          campaignId={item.id}
          onClose={() => setPublishOpen(false)}
          onSuccess={() => {
            setFeed((prev) =>
              prev.map((p) =>
                p.id === item.id ? { ...p, isPublished: true } : p
              )
            );
          }}
        />
      )}
    </div>
  );
}
