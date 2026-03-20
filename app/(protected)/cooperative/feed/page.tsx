'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import MainLayout from '@/src/components/layout/MainLayout';

import { feedService } from '@/src/services/feedService';
import { Post, PostType } from '@/src/types';
import { authService } from '@/src/services/authService';
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
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { showToast } from '@/src/utils/toast';

import { useTranslation } from 'react-i18next';

export default function FeedPage() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const normalizeDate = (dateString?: string) => {
    if (!dateString) return new Date().toISOString();
    return dateString.endsWith('Z') ? dateString : dateString + 'Z';
  };

  const loadFeed = useCallback(async () => {
    try {
      if (page === 0) setLoading(true);
      else setLoadingMore(true);

      const user = await authService.getProfile();
      const coopId = user.id;

      const res = await feedService.getFeed(coopId, page, 10);

      const data = Array.isArray(res) ? res : (res.content ?? []);
      const normalized = data.map((p: Post, index: number) => ({
        ...p,
        id: p.id || `${Date.now()}-${index}`,
        createdAt: normalizeDate(p.createdAt),
        attachments: p.attachments || [],
        likeCount: p.likeCount || 0,
        commentCount: p.commentCount || 0,
        liked: p.liked || false,
      }));

      setFeed((prev) => (page === 0 ? normalized : [...prev, ...normalized]));

      setHasMore(data.length === 10);
    } catch (err) {
      console.error('Load feed failed:', err);
      showToast('error', {
        message: t('FEED.ERROR_LOAD'),
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, t]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    setPage((prev) => prev + 1);
  };

  const campaignCount = feed.filter((f) => f.type === 'CAMPAIGN').length;
  const announcementCount = feed.filter(
    (f) => f.type === 'ANNOUNCEMENT'
  ).length;

  const handleCreatePost = async () => {
    setPage(0);
    setFeed([]);
  };
  const filteredFeed =
    filter === 'ALL' ? feed : feed.filter((f) => f.type === filter);

  const campaignPosts = feed.filter((f) => f.type === 'CAMPAIGN');
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadingMore]);
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4 pb-4">
              <div className="bg-linear-to-r from-green-500 via-emerald-500 to-green-600 h-36 rounded-2xl flex items-center justify-between px-8 text-white shadow-lg">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    {t('FEED.TITLE')}
                  </h2>
                  <p className="text-sm opacity-90">{t('FEED.SUBTITLE')}</p>
                </div>

                <Sprout size={40} className="opacity-80" />

                <button
                  onClick={() => router.push('/cooperative/marketplace')}
                  className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:scale-105 transition"
                >
                  <ShoppingCart size={16} />
                  {t('FEED.MARKETPLACE')}
                </button>
              </div>

              {/* FILTER */}
              <div className="flex gap-2 flex-wrap bg-white p-3 rounded-xl shadow">
                {[
                  {
                    key: 'ALL',
                    label: t('FEED.FILTER.ALL'),
                    icon: <Newspaper size={16} />,
                  },
                  {
                    key: 'ANNOUNCEMENT',
                    label: t('FEED.FILTER.ANNOUNCEMENT'),
                    icon: <Megaphone size={16} />,
                  },
                  {
                    key: 'CAMPAIGN',
                    label: t('FEED.FILTER.CAMPAIGN'),
                    icon: <Sprout size={16} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as PostType | 'ALL')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition
                    ${
                      filter === tab.key
                        ? 'bg-green-500 text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* CREATE */}
              <div className="sticky top-4 z-20">
                <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Sprout size={18} />
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-600 transition"
                  >
                    {t('FEED.THINKING')}
                  </button>

                  <button
                    onClick={() => setOpen(true)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  >
                    <PlusCircle size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="text-center py-16 text-gray-400">
                {t('FEED.LOADING')}
              </div>
            )}

            {/* EMPTY */}
            {!loading && filteredFeed.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                {t('FEED.EMPTY_POST')}
              </div>
            )}

            {/* FEED */}
            {!loading &&
              filteredFeed.map((item, index) => (
                <FeedCard
                  key={item.id ?? `${item.createdAt}-${index}`} // 🔥 no warning
                  item={item}
                  setFeed={setFeed}
                />
              ))}
          </div>
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="h-10 flex justify-center items-center"
            >
              {loadingMore && (
                <span className="text-gray-400 text-sm">
                  {t('FEED.LOADING')}
                </span>
              )}
            </div>
          )}
          {/* ===== RIGHT ===== */}
          <div className="lg:col-span-4 space-y-6 sticky top-24 self-start">
            {/* STATS */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">{t('FEED.QUICK_STATS')}</h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold">{feed.length}</p>
                  <p className="text-xs text-gray-500">
                    {t('FEED.TOTAL_POSTS')}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-green-600">
                    {campaignCount}
                  </p>
                  <p className="text-xs text-gray-500">{t('FEED.CAMPAIGNS')}</p>
                </div>

                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-red-600">
                    {announcementCount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('FEED.ANNOUNCEMENTS')}
                  </p>
                </div>
              </div>
            </div>

            {/* CAMPAIGN */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">
                {t('FEED.UPCOMING_CAMPAIGN')}
              </h3>

              {campaignPosts.length === 0 && (
                <p className="text-sm text-gray-400">{t('FEED.NO_CAMPAIGN')}</p>
              )}

              <div className="space-y-3">
                {campaignPosts.map((post) => (
                  <div key={post.id} className="bg-green-50 p-3 rounded-xl">
                    <p className="font-medium text-green-700">
                      {PRODUCE_LABELS[post.productName as ProduceType] ??
                        post.productName}
                    </p>

                    {post.expectedDate && (
                      <p className="text-xs text-gray-500">
                        📅{' '}
                        {new Date(post.expectedDate).toLocaleDateString(
                          'vi-VN'
                        )}
                      </p>
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
