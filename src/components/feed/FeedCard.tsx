'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  ShoppingCart,
  Sprout,
  Flame,
  CornerDownRight,
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
    label: 'Thu gom',
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

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút`;
    if (hours < 24) return `${hours} giờ`;
    return `${days} ngày`;
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

      setComments(res);
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

      setTimeout(() => {
        const el = document.getElementById('comment-bottom');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition border overflow-hidden">
      {/* HEADER */}
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

      {item?.image && (
        <img
          src={item.image}
          alt="post"
          className="w-full max-h-[420px] object-cover"
        />
      )}

      <div className="p-4 space-y-3">
        {postType === 'CAMPAIGN' && (
          <button
            onClick={() => setPublishOpen(true)}
            disabled={item.isPublished}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition
      ${
        item.isPublished
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}
          >
            <ShoppingCart size={16} />
            {item.isPublished ? 'Đã đăng Marketplace' : 'Đăng bán sản phẩm'}
          </button>
        )}

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

        {showComments && (
          <div className="space-y-3 pt-3 border-t">
            {loadingComment && (
              <p className="text-sm text-gray-400">Đang tải bình luận...</p>
            )}

            {!loadingComment && comments.length === 0 && (
              <p className="text-sm text-gray-400">Chưa có bình luận</p>
            )}

            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                  <Sprout size={16} />
                </div>

                <div className="flex-1">
                  <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm">
                    <p className="font-semibold text-gray-800 text-xs">
                      {c.farmerName}
                    </p>

                    <p className="text-gray-700">{c.content}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 pl-1">
                    <span>{formatTimeAgo(c.createdAt)}</span>

                    <button className="flex items-center gap-1 hover:text-blue-600 font-medium">
                      <CornerDownRight size={12} />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                <Sprout size={16} />
              </div>

              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Viết bình luận..."
              />

              <button
                onClick={handleComment}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Gửi
              </button>
            </div>

            <div id="comment-bottom" />
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
