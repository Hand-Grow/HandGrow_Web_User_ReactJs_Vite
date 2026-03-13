'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

import { feedService } from '@/services/feedService';
import { Post, PostType } from '@/src/types';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

import FeedCard from '@/src/components/feed/FeedCard';
import CreatePostModal from '@/src/components/feed/CreatePostModal';

import {
  Megaphone,
  Sprout,
  Newspaper,
  PlusCircle,
  ShoppingCart,
} from 'lucide-react';
import { PRODUCE_LABELS, ProduceType } from '@/constants/produce';

export default function FeedPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');

  const router = useRouter();
  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const user = await authService.getProfile();
        const coopId = user.id;

        const data = await feedService.getFeed(coopId);

        setFeed(data || []);
      } catch (err) {
        console.error('Load feed failed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const campaignCount = feed.filter((f) => f.type === 'CAMPAIGN').length;
  const announcementCount = feed.filter(
    (f) => f.type === 'ANNOUNCEMENT'
  ).length;

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
            <div className="sticky top-0 z-20 space-y-4 pb-4 backdrop-blur bg-gray-50/90">
              <div
                className="bg-linear-to-r from-green-500 via-emerald-500 to-green-600
                h-36 rounded-2xl flex items-center justify-between px-8 text-white shadow-lg"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Bảng tin HTX
                  </h2>

                  <p className="text-sm opacity-90">
                    Cập nhật thông báo và chiến dịch thu gom
                  </p>
                </div>

                <Sprout size={40} className="opacity-80" />

                <button
                  onClick={() => router.push('/cooperative/marketplace')}
                  className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow
                  hover:bg-gray-100 hover:scale-105 transition"
                >
                  <ShoppingCart size={16} />
                  Marketplace
                </button>
              </div>

              <div className="flex gap-2 flex-wrap bg-white p-3 rounded-xl shadow">
                {[
                  {
                    key: 'ALL',
                    label: 'Tất cả',
                    icon: <Newspaper size={16} />,
                  },
                  {
                    key: 'ANNOUNCEMENT',
                    label: 'Thông báo',
                    icon: <Megaphone size={16} />,
                  },
                  {
                    key: 'CAMPAIGN',
                    label: 'Thu gom',
                    icon: <Sprout size={16} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as PostType | 'ALL')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition
                    ${
                      filter === (tab.key as PostType | 'ALL')
                        ? 'bg-green-500 text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Sprout size={18} />
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="flex-1 text-left bg-gray-100 hover:bg-gray-200
                  rounded-full px-4 py-2 text-gray-600 transition"
                >
                  Bạn đang nghĩ gì?
                </button>

                <button
                  onClick={() => setOpen(true)}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>

            {loading && (
              <div className="text-center py-16 text-gray-400">
                Đang tải bảng tin...
              </div>
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

          <div className="lg:col-span-4 space-y-6 sticky top-24 self-start">
            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                📊 Thống kê nhanh
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold">{feed.length}</p>
                  <p className="text-xs text-gray-500">Tổng bài</p>
                </div>

                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-green-600">
                    {campaignCount}
                  </p>
                  <p className="text-xs text-gray-500">Thu gom</p>
                </div>

                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-red-600">
                    {announcementCount}
                  </p>
                  <p className="text-xs text-gray-500">Thông báo</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Thu gom sắp tới
              </h3>

              {campaignPosts.length === 0 && (
                <p className="text-sm text-gray-400">Chưa có đợt thu gom</p>
              )}

              <div className="space-y-3">
                {campaignPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-green-50 p-3 rounded-xl hover:bg-green-100 transition"
                  >
                    {'productName' in post && (
                      <>
                        <p className="font-medium text-green-700 flex items-center gap-1">
                          {PRODUCE_LABELS[post.productName as ProduceType] ??
                            post.productName}
                          {' · '}
                        </p>

                        {post.expectedDate && (
                          <p className="text-xs text-gray-500">
                            📅
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
