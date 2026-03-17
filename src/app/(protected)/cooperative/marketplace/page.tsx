'use client';

import { useEffect, useState, useMemo } from 'react';

import MainLayout from '@/src/components/layout/MainLayout';
import { feedService } from '@/src/services/feedService';
import { MarketplacePost } from '@/src/types';

import { Store, PackageSearch, Clock, Filter } from 'lucide-react';

import MarketplaceCard from '@/src/components/feed/MarketplaceModal';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { useTranslation } from 'react-i18next';

const getProduceLabel = (value?: string) => {
  return PRODUCE_LABELS[value as ProduceType] ?? value ?? 'Khác';
};
export default function MarketplacePage() {
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [productFilter, setProductFilter] = useState<string>('all');

  useEffect(() => {
    const loadMarketplace = async () => {
      try {
        const data = await feedService.getMarketplacePosts();
        setPosts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();
  }, []);

  const productOptions = useMemo(() => {
    const uniqueProducts = Array.from(new Set(posts.map((p) => p.productName)));

    return uniqueProducts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // SEARCH
    if (search) {
      const keyword = search.toLowerCase();

      result = result.filter((post) => {
        const label = getProduceLabel(post.productName).toLowerCase();
        const value = post.productName?.toLowerCase() || '';

        return label.includes(keyword) || value.includes(keyword);
      });
    }

    // PRODUCT FILTER
    if (productFilter !== 'all') {
      result = result.filter((post) => post.productName === productFilter);
    }

    // TIME FILTER
    if (timeFilter) {
      const now = Date.now();

      result = result.filter((post) => {
        const created = new Date(post.createdAt).getTime();
        const diffDays = (now - created) / (1000 * 60 * 60 * 24);

        return diffDays <= timeFilter;
      });
    }

    return result;
  }, [posts, search, timeFilter, productFilter]);

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen px-4 md:px-6 py-6 md:py-8">
        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Store size={28} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {t('MARKETPLACE.TITLE')}
              </h1>
              <p className="text-sm opacity-90">{t('MARKETPLACE.SUBTITLE')}</p>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-sm opacity-80">Kết quả</p>
            <p className="text-3xl font-bold"> {filteredPosts.length} </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center gap-3 mb-6">
          {/* SEARCH */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg flex-1">
            <PackageSearch size={18} className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={t('MARKETPLACE.SEARCH_PLACEHOLDER')}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          {/* PRODUCT DROPDOWN */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Filter size={16} className="text-gray-400" />

            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="text-sm bg-transparent outline-none"
            >
              <option value="all">{t('MARKETPLACE.FILTER.ALL')}</option>

              {productOptions.map((product) => (
                <option key={product} value={product}>
                  {getProduceLabel(product)}
                </option>
              ))}
            </select>
          </div>

          {/* TIME FILTER */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <Clock size={16} className="text-gray-400 shrink-0" />

            {[
              { label: 'Tất cả', value: null },
              { label: '1 ngày', value: 1 },
              { label: '3 ngày', value: 3 },
              { label: '7 ngày', value: 7 },
              { label: '30 ngày', value: 30 },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setTimeFilter(item.value)}
                className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap transition
                ${
                  timeFilter === item.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Store size={42} className="mx-auto mb-4 opacity-40" />

            <p className="text-lg font-medium">
              {' '}
              {t('MARKETPLACE.EMPTY.TITLE')}{' '}
            </p>

            <p className="text-sm"> {t('MARKETPLACE.EMPTY.SUBTITLE')} </p>
          </div>
        )}

        {/* GRID */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPosts.map((post) => (
              <MarketplaceCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
