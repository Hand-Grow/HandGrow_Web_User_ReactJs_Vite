'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { ThumbsUp, MessageCircle, ShoppingCart } from 'lucide-react';

import { CommentResponse, feedService } from '@/services/feedService';
import { Post, PostType } from '@/src/types';

interface FeedCardProps {
  item: Post;
  setFeed: Dispatch<SetStateAction<Post[]>>;
}

type ApiType = 'announcement' | 'campaign';

const typeConfig: Record<PostType, { label: string; color: string }> = {
  ANNOUNCEMENT: {
    label: 'Thông báo',
    color: 'bg-red-100 text-red-700',
  },
  CAMPAIGN: {
    label: 'Thu gom',
    color: 'bg-green-100 text-green-700',
  },
};

export default function FeedCard({ item, setFeed }: FeedCardProps) {
  const [comment, setComment] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);

  const postType: PostType =
    item.type === 'CAMPAIGN' ? 'CAMPAIGN' : 'ANNOUNCEMENT';

  const apiType: ApiType =
    postType === 'ANNOUNCEMENT' ? 'announcement' : 'campaign';

  const config = typeConfig[postType];

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
      console.error('Like error:', err);
    }
  };

  const loadComments = async () => {
    try {
      setLoadingComment(true);

      const res = await feedService.getComments(apiType, item.id);

      setComments(res?.content ?? []);
    } catch (err) {
      console.error('Load comments error:', err);
      setComments([]);
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments]);

  // ================= POST COMMENT =================
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
      console.error('Post comment error:', err);
    }
  };

  // ================= SELL BUTTON =================
  const handleSell = () => {
    alert(`Tạo bài đăng bán cho: ${item.title}`);
    // sau này có thể navigate tới trang tạo sản phẩm
    // router.push(`/sell?product=${item.title}`)
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow border space-y-4 relative">
      {/* TYPE TAG */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-medium ${config.color}`}
      >
        {config.label}
      </span>

      {/* HEADER */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="font-semibold">Bài đăng từ HTX</span>

        <span className="text-gray-400 text-xs">
          • {new Date(item.createdAt).toLocaleString('vi-VN')}
        </span>
      </div>

      {/* CONTENT */}
      {postType === 'CAMPAIGN' ? (
        <p className="text-sm text-gray-700">
          Chúng tôi muốn thu gom <strong>{item.title}</strong> vào ngày{' '}
          <strong>{formatDate(item.content)}</strong>
        </p>
      ) : (
        <>
          <h3 className="font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-700">{item.content}</p>
        </>
      )}

      {/* SELL BUTTON */}
      {postType === 'CAMPAIGN' && (
        <button
          onClick={handleSell}
          className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <ShoppingCart size={16} />
          Đăng bán sản phẩm
        </button>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between border-t pt-3 text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition ${
            item.liked ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }`}
        >
          <ThumbsUp size={16} />
          Thích ({item.likeCount})
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          <MessageCircle size={16} />
          Bình luận ({item.commentCount})
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="space-y-2 pt-2 border-t">
          {loadingComment && (
            <p className="text-sm text-gray-400">Đang tải bình luận...</p>
          )}

          {!loadingComment && comments?.length === 0 && (
            <p className="text-sm text-gray-400">Chưa có bình luận</p>
          )}

          {comments?.map((c) => (
            <div key={c.id} className="bg-gray-100 p-2 rounded-lg text-sm">
              <strong>{c.authorName}:</strong> {c.content}
            </div>
          ))}

          {/* INPUT COMMENT */}
          <div className="flex gap-2 pt-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-1 text-sm"
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
  );
}
