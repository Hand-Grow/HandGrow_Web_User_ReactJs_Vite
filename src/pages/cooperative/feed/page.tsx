'use client';

import { useEffect, useState } from 'react';
import FeedCard from '../components/feed/FeedCard';
import MainLayout from '../main-layout';
import CreatePostModal from '../components/feed/CreatePostModal';
import {
  AnnouncementPost,
  Author,
  Post,
  PostType,
  CollectionPost,
} from '../../../types/posts';
import { feedService } from '../../../services/feedService';

export default function FeedPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');

  const author: Author = {
    id: 1,
    name: 'Bạn',
    avatar: '/avatar.jpg',
  };

  const initialPost: AnnouncementPost = {
    id: 1,
    type: 'ANNOUNCEMENT',
    content: 'Tuần sau HTX chốt đơn lúa ST25.',
    createdAt: new Date().toISOString(),
    reactions: { like: 2, love: 1 },
    comments: [],
    author,
  };

  const [feed, setFeed] = useState<Post[]>([initialPost]);

  const handleCreatePost = (post: Post) => {
    setFeed((prev) => [post, ...prev]);
  };

  const filteredFeed =
    filter === 'ALL' ? feed : feed.filter((f) => f.type === filter);

  const collectionPosts = feed.filter(
    (f): f is CollectionPost => f.type === 'COLLECTION'
  );
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await feedService.getFeed('123');
        setFeed(data.content);
      } catch (err) {
        console.error(err);
      }
    };

    loadFeed();
  }, []);
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div
              className="bg-linear-to-r from-green-500 to-green-600 
                            h-28 md:h-32 rounded-2xl flex items-center px-6 text-white"
            >
              <h2 className="text-lg md:text-xl font-semibold">
                Bảng tin HTX Nông Nghiệp
              </h2>
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {['ALL', 'ANNOUNCEMENT', 'COLLECTION', 'SELL'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as PostType | 'ALL')}
                  className={`px-4 py-1 rounded-full text-sm transition
                    ${
                      filter === type
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {type === 'ALL' && 'Tất cả'}
                  {type === 'ANNOUNCEMENT' && 'Thông báo'}
                  {type === 'COLLECTION' && 'Thu gom'}
                  {type === 'SELL' && 'Bán'}
                </button>
              ))}
            </div>

            {/* Create Post */}
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <button
                onClick={() => setOpen(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 
                           rounded-full py-2 text-gray-600 transition"
              >
                Bạn đang nghĩ gì?
              </button>
            </div>

            {filteredFeed.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg">Không có bài đăng</p>
              </div>
            )}

            {filteredFeed.map((item) => (
              <FeedCard key={item.id} item={item} setFeed={setFeed} />
            ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Thống kê nhanh</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p>Tổng bài: {feed.length}</p>
                <p>
                  Thu gom: {feed.filter((f) => f.type === 'COLLECTION').length}
                </p>
                <p> Bán: {feed.filter((f) => f.type === 'SELL').length}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Thu gom sắp tới</h3>

              {collectionPosts.length === 0 && (
                <p className="text-sm text-gray-400">Chưa có đợt thu gom</p>
              )}

              <div className="space-y-2">
                {collectionPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-green-50 p-2 rounded-lg text-sm"
                  >
                    <p className="font-medium">{post.productName}</p>
                    <p className="text-gray-500">
                      {new Date(post.expectedDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <CreatePostModal
          onClose={() => setOpen(false)}
          onCreate={handleCreatePost}
        />
      )}
    </MainLayout>
  );
}
