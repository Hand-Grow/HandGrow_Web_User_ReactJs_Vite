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

import { CommentResponse, feedService } from '@/src/services/feedService';
import { Post, PostType } from '@/src/types';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants';
import PublishCampaignModal from './PublishCampaignModal';

interface FeedCardProps {
  item: Post;
  setFeed: Dispatch<SetStateAction<Post[]>>;
}

type ApiType = 'announcement' | 'campaign';

const typeConfig: Record<PostType, { label: string; color: string }> = {
  ANNOUNCEMENT: {
    label: 'Thông báo',
    color: 'bg-red-100 text-red-600',
  },
  CAMPAIGN: {
    label: 'Thu gom',
    color: 'bg-green-100 text-green-700',
  },
};

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;

  return date.toLocaleDateString('vi-VN');
}

export default function FeedCard({ item, setFeed }: FeedCardProps) {
  const [showGallery, setShowGallery] = useState(false);
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

  const productLabel =
    postType === 'CAMPAIGN'
      ? (PRODUCE_LABELS[(item.productName || item.title) as ProduceType] ??
        (item.productName || item.title))
      : item.title;

  const isRecent =
    Date.now() - new Date(item.createdAt).getTime() < 24 * 60 * 60 * 1000;

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGallery(false);
    };

    if (showGallery) window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [showGallery]);

  const renderAttachments = () => {
    const images = item.attachments || [];

    if (images.length === 1) {
      return (
        <img
          src={images[0]}
          alt="attachment"
          className="w-full max-h-[420px] object-cover cursor-pointer hover:scale-105 transition"
          onClick={() => setShowGallery(true)}
        />
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1">
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`attachment-${i}`}
              className="w-full h-72 object-cover cursor-pointer hover:scale-105 transition"
              onClick={() => setShowGallery(true)}
            />
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1">
          <img
            src={images[0]}
            alt="attachment"
            className="w-full h-[300px] object-cover cursor-pointer hover:scale-105 transition"
            onClick={() => setShowGallery(true)}
          />

          <div className="grid grid-rows-2 gap-1">
            {images.slice(1).map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`attachment-${i}`}
                className="w-full h-[148px] object-cover cursor-pointer hover:scale-105 transition"
                onClick={() => setShowGallery(true)}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-1">
        {images.slice(0, 4).map((url, i) => {
          const remaining = images.length - 4;

          return (
            <div
              key={i}
              className="relative cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={url}
                alt={`attachment-${i}`}
                className="w-full h-56 object-cover hover:scale-105 transition"
              />

              {i === 3 && remaining > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-semibold">
                  +{remaining}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
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
            Mới
          </span>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
            <Sprout size={18} />
          </div>

          <div>
            <p className="font-semibold text-gray-800">Hợp tác xã</p>
            <p className="text-xs text-gray-400">{timeAgo(item.createdAt)}</p>
          </div>
        </div>

        {postType === 'CAMPAIGN' ? (
          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            <div className="text-green-700 font-semibold text-lg">
              {productLabel}
            </div>

            {item.content && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.content}
              </p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-green-600" />
              Thu gom dự kiến:
              <span className="font-semibold text-green-700">
                {item.expectedDate
                  ? new Date(item.expectedDate).toLocaleDateString('vi-VN')
                  : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed">
              {item.content}
            </p>
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="w-full overflow-hidden"> {renderAttachments()} </div>
      )}

      {showGallery && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setShowGallery(false)}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {item.attachments?.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`gallery-${i}`}
                className="w-full object-cover rounded-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      )}

      <div className="px-5 py-3 flex items-center justify-between text-sm border-t">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
            item.liked ? 'text-blue-600 font-semibold' : 'hover:bg-gray-100'
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

        {postType === 'CAMPAIGN' && (
          <button
            onClick={() => setPublishOpen(true)}
            disabled={item.published}
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-lg transition
              ${
                item.published
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            <ShoppingCart size={16} />
            {item.published ? 'Đã đăng Marketplace' : 'Đăng bán'}
          </button>
        )}
      </div>

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
                  Reply
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Viết bình luận..."
            />

            <button
              onClick={handleComment}
              className="text-blue-600 text-sm font-semibold"
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {publishOpen && (
        <PublishCampaignModal
          campaignId={item.id}
          onClose={() => setPublishOpen(false)}
          onSuccess={() => {
            setFeed((prev) =>
              prev.map((p) =>
                p.id === item.id ? { ...p, published: true } : p
              )
            );
          }}
        />
      )}
    </div>
  );
}
