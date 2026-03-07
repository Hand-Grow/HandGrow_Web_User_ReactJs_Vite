'use client';

import { useEffect, useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';
import { feedService } from '@/services/feedService';

import { MarketplacePost } from '@/src/types';

import { Store } from 'lucide-react';
import MarketplaceCard from '@/src/components/feed/MarketplaceModal';

export default function MarketplacePage() {
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* HEADER */}
        <div
          className="bg-linear-to-r from-green-500 to-emerald-600
        text-white rounded-2xl p-6 flex items-center gap-4 mb-6 shadow"
        >
          <Store size={36} />

          <div>
            <h1 className="text-2xl font-bold">Marketplace Nông sản</h1>

            <p className="text-sm opacity-90">
              Các lô hàng đang mở bán từ hợp tác xã
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            Đang tải marketplace...
          </div>
        )}

        {/* EMPTY */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            Chưa có lô hàng nào
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <MarketplaceCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
