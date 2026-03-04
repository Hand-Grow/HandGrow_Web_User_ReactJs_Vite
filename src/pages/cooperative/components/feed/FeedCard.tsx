import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Post, PostType } from '../../../../types/posts';
import { CommentResponse, feedService } from '../../../../services/feedService';

interface FeedCardProps {
  item: Post;
  setFeed: Dispatch<SetStateAction<Post[]>>;
}

const typeConfig: Record<PostType, { label: string; color: string }> = {
  ANNOUNCEMENT: {
    label: 'Thông báo',
    color: 'bg-red-100 text-red-700',
  },
  COLLECTION: {
    label: 'Thu gom',
    color: 'bg-green-100 text-green-700',
  },
  SELL: {
    label: 'Bán',
    color: 'bg-yellow-100 text-yellow-700',
  },
};

export default function FeedCard({ item, setFeed }: FeedCardProps) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComment, setLoadingComment] = useState(false);

  const apiType = item.type === 'ANNOUNCEMENT' ? 'announcements' : 'campaigns';

  const handleLike = async () => {
    try {
      await feedService.toggleLike(apiType, item.id);
      setFeed((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                reactions: {
                  ...p.reactions,
                  like: (p.reactions.like || 0) + 1,
                },
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
      setComments(res.content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
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
    <div className="bg-white p-5 rounded-2xl shadow border space-y-4 relative">
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-medium ${typeConfig[item.type].color}`}
      >
        {typeConfig[item.type].label}
      </span>

      <div className="flex gap-3 items-center">
        <img src={item.author.avatar} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{item.author.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p>{item.content}</p>

      {/* ACTION BAR */}
      <div className="flex justify-between border-t pt-3 text-sm">
        <button onClick={handleLike} className="flex items-center gap-1">
          <ThumbsUp size={16} />
          Thích ({item.reactions.like || 0})
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1"
        >
          <MessageCircle size={16} />
          Bình luận
        </button>
      </div>

      {showComments && (
        <div className="space-y-2">
          {loadingComment && (
            <p className="text-sm text-gray-400"> Đang tải bình luận...</p>
          )}

          {comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-2 rounded-lg text-sm">
              <strong>{c.authorName}:</strong> {c.content}
            </div>
          ))}

          <div className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-1"
              placeholder="Viết bình luận..."
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-3 rounded-lg"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
