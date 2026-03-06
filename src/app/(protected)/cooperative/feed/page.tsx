'use client';

import { useEffect, useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';

import { feedService } from '@/services/feedService';
import { Post, PostType } from '@/src/types';
import { authService } from '@/services/authService';

import FeedCard from '@/src/components/feed/FeedCard';
import CreatePostModal from '@/src/components/feed/CreatePostModal';

export default function FeedPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');

  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const user = await authService.getProfile();
        const coopId = user.id;
        const data = await feedService.getFeed(coopId);
        console.log('Feed data:', data);

        setFeed(data || []);
      } catch (err) {
        console.error('Load feed failed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const handleCreatePost = (post: Post) => {
    setFeed((prev) => [post, ...prev]);
  };

  const filteredFeed =
    filter === 'ALL' ? feed : feed.filter((f) => f.type === filter);

  const campaignPosts = feed.filter((f) => f.type === 'CAMPAIGN');

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-linear-to-r from-green-500 to-green-600 h-28 md:h-32 rounded-2xl flex items-center px-6 text-white">
              <h2 className="text-lg md:text-xl font-semibold">
                Bảng tin HTX Nông Nghiệp
              </h2>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['ALL', 'ANNOUNCEMENT', 'CAMPAIGN'].map((type) => (
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
                  {type === 'CAMPAIGN' && 'Thu gom'}
                </button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md">
              <button
                onClick={() => setOpen(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 
                rounded-full py-2 text-gray-600 transition"
              >
                Bạn đang nghĩ gì?
              </button>
            </div>

            {loading && (
              <div className="text-center py-16 text-gray-400">Đang tải...</div>
            )}

            {!loading && filteredFeed.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                Không có bài đăng
              </div>
            )}

            {!loading &&
              filteredFeed.map((item) => (
                <FeedCard key={item.id} item={item} setFeed={setFeed} />
              ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Thống kê nhanh</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p>Tổng bài: {feed.length}</p>
                <p>
                  Thu gom: {feed.filter((f) => f.type === 'CAMPAIGN').length}
                </p>
                <p>
                  Thông báo:
                  {feed.filter((f) => f.type === 'ANNOUNCEMENT').length}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Thu gom sắp tới</h3>

              {campaignPosts.length === 0 && (
                <p className="text-sm text-gray-400"> Chưa có đợt thu gom</p>
              )}

              <div className="space-y-2">
                {campaignPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-green-50 p-2 rounded-lg text-sm"
                  >
                    {'productName' in post && (
                      <>
                        <p className="font-medium"> {post.productName}</p>

                        {'expectedDate' in post && (
                          <p className="text-gray-500">
                            {new Date(post.expectedDate).toLocaleDateString(
                              'vi-VN'
                            )}
                          </p>
                        )}
                      </>
                    )}
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
