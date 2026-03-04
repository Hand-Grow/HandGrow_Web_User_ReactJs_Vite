'use client';

import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Lock,
  Globe,
  Plus,
  X,
} from 'lucide-react';

type Visibility = 'INTERNAL' | 'PUBLIC';

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  visibility: Visibility;
  createdAt: string;
  likes: number;
  liked: boolean;
  shares: number;
  comments: Comment[];
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openCommentPost, setOpenCommentPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PUBLIC');

  // ❤️ Like
  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // 💬 Add comment
  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  user: 'Bạn',
                  content: newComment,
                },
              ],
            }
          : post
      )
    );

    setNewComment('');
  };

  // 🔁 Share
  const handleShare = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  // 📝 Create post
  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      visibility,
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
      liked: false,
      shares: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);

    setTitle('');
    setContent('');
    setVisibility('PUBLIC');
    setShowCreateModal(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bài đăng HTX</h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus className="w-4 h-4" />
          Tạo bài đăng
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          Chưa có bài đăng nào
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="bg-white p-5 rounded-xl shadow border">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3 text-xs">
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                post.visibility === 'INTERNAL'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {post.visibility === 'INTERNAL' ? (
                <>
                  <Lock className="w-3 h-3" />
                  Nội bộ
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3" />
                  Công khai
                </>
              )}
            </span>
            <span className="text-gray-400">{post.createdAt}</span>
          </div>

          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>

          <p className="text-gray-700 text-sm mb-4">{post.content}</p>

          {/* Stats */}
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <span>{post.likes} lượt thích</span>
            <span>
              {post.comments.length} bình luận · {post.shares} chia sẻ
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-around border-t pt-3 text-sm">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-2 ${
                post.liked ? 'text-red-500 font-semibold' : 'text-gray-600'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${post.liked ? 'fill-red-500' : ''}`}
              />
              Thích
            </button>

            <button
              onClick={() =>
                setOpenCommentPost(openCommentPost === post.id ? null : post.id)
              }
              className="flex items-center gap-2 text-gray-600"
            >
              <MessageCircle className="w-4 h-4" />
              Bình luận
            </button>

            <button
              onClick={() => handleShare(post.id)}
              className="flex items-center gap-2 text-gray-600"
            >
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </button>
          </div>

          {/* Comments */}
          {openCommentPost === post.id && (
            <div className="mt-4 border-t pt-4 space-y-3">
              {post.comments.map((c) => (
                <div key={c.id} className="bg-gray-100 p-2 rounded-lg text-sm">
                  <span className="font-semibold">{c.user}: </span>
                  {c.content}
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="bg-emerald-600 text-white px-3 py-2 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Tạo bài đăng</h2>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

              <textarea
                placeholder="Nội dung bài đăng..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm h-24"
              />

              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="PUBLIC">Công khai</option>
                <option value="INTERNAL">Nội bộ (chỉ thành viên)</option>
              </select>

              <button
                onClick={handleCreatePost}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
