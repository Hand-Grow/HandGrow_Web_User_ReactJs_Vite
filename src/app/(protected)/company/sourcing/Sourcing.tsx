'use client';

import { useState, useEffect } from 'react';
import SourcingHeader from './components/SourcingHeader';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import { marketplaceApi } from '../../../../../services/marketplace/marketplaceApi';
import { toast } from 'react-toastify';
import { PRODUCE_LABELS } from '../../../../../constants/produce';

interface BulkSale {
  id: string;
  campaignId: string;
  productName: string;
  totalQuantity: number;
  expectedPrice: number | null;
  status: 'OPEN' | 'CLOSED';
  coopName: string;
  createdAt: string;
}

export default function SourcingPage() {
  const [bulkSales, setBulkSales] = useState<BulkSale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    product: string;
    min_qty: number;
    page: number;
  }>({
    product: '',
    min_qty: 0,
    page: 0,
  });
  const [sortBy, setSortBy] = useState<
    'relevant' | 'price_asc' | 'price_desc' | 'quantity_desc'
  >('relevant');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBulkSales();
  }, [filters]);

  const fetchBulkSales = async () => {
    try {
      setLoading(true);

      const response = await marketplaceApi.getBulkSales(filters);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.content || [];

      let sortedData = [...data];
      if (sortBy === 'price_asc') {
        sortedData.sort(
          (a, b) => (a.expectedPrice || 0) - (b.expectedPrice || 0)
        );
      } else if (sortBy === 'price_desc') {
        sortedData.sort(
          (a, b) => (b.expectedPrice || 0) - (a.expectedPrice || 0)
        );
      } else if (sortBy === 'quantity_desc') {
        sortedData.sort((a, b) => b.totalQuantity - a.totalQuantity);
      } else if (sortBy === 'relevant') {
        sortedData.sort((a, b) => {
          const aScore = a.expectedPrice && a.totalQuantity > 0 ? 1 : 0;
          const bScore = b.expectedPrice && b.totalQuantity > 0 ? 1 : 0;
          return bScore - aScore;
        });
      }

      if (searchTerm) {
        sortedData = sortedData.filter((item) =>
          item.coopName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filters.product && filters.product !== '') {
        const selectedLabel =
          filters.product === 'Tất cả'
            ? ''
            : PRODUCE_LABELS[filters.product as keyof typeof PRODUCE_LABELS] ||
              filters.product;

        if (selectedLabel) {
          const searchLabel = selectedLabel.toLowerCase();

          const englishKeywords: Record<string, string[]> = {
            'lúa gạo': ['RICE', 'Lúa gạo'],
            ngô: ['CORN', 'Ngô'],
            'rau củ': ['VEGETABLES', 'Rau củ'],
            'trái cây': ['FRUITS', 'Trái cây'],
            'cà phê': ['COFFEE', 'Cà phê'],
            chè: ['TEA', 'Chè'],
            'cao su': ['RUBBER', 'Cao su'],
            mía: ['SUGARCANE', 'Mía'],
            sắn: ['CASSAVA', 'Sắn'],
            tiêu: ['PEPPER', 'Tiêu'],
            dừa: ['COCONUT', 'Dừa'],
            điều: ['CASHEW', 'Điều'],
            'thủy sản': ['AQUACULTURE', 'Thủy sản'],
            'chăn nuôi': ['LIVESTOCK', 'Chăn nuôi'],
          };

          const keywords = englishKeywords[searchLabel] || [searchLabel];

          if (filters.product === 'OTHER') {
            const definedKeywords = Object.values(englishKeywords).flat();
            sortedData = sortedData.filter((item) => {
              const productName = item.productName.toUpperCase();
              return !definedKeywords.some(
                (keyword) => productName === keyword
              );
            });
          } else {
            sortedData = sortedData.filter((item) => {
              const productName = item.productName.toUpperCase();
              return keywords.some((keyword) =>
                productName.includes(keyword.toUpperCase())
              );
            });
          }
        }
      }

      setBulkSales(sortedData);
    } catch (error) {
      console.error('❌ Full error object:', error);
      console.error('❌ Error message:', (error as Error).message);
      console.error(
        '❌ Error response:',
        (
          error as {
            response?: { status?: number; data?: { message?: string } };
          }
        ).response
      );
      console.error(
        '❌ Error status:',
        (error as { response?: { status?: number } }).response?.status
      );

      let errorMessage = 'Lỗi khi tải danh sách sản phẩm';

      const errorResponse = error as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      };
      if (errorResponse.response?.status === 401) {
        errorMessage = 'Phiên đăng nhập đã hết hạn';
      } else if (errorResponse.response?.status === 403) {
        errorMessage = 'Bạn không có quyền truy cập';
      } else if (errorResponse.response?.status === 404) {
        errorMessage = 'Không tìm thấy API endpoint';
      } else if (errorResponse.response?.data?.message) {
        errorMessage = String(errorResponse.response.data.message ?? '');
      } else if ((error as Error).message) {
        errorMessage = (error as Error).message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: {
    product?: string;
    min_qty?: number;
    page?: number;
  }) => {
    setFilters((prev: { product: string; min_qty: number; page: number }) => ({
      ...prev,
      ...newFilters,
      page: 0,
    }));
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return (
    <div className="flex flex-col gap-8">
      <SourcingHeader />

      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Tìm thấy {bulkSales.length} sản phẩm
        </p>

        <select
          className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as
                | 'relevant'
                | 'price_asc'
                | 'price_desc'
                | 'quantity_desc'
            )
          }
        >
          <option value="relevant">Liên quan nhất</option>
          <option value="price_asc">Giá thấp → cao</option>
          <option value="price_desc">Giá cao → thấp</option>
          <option value="quantity_desc">Số lượng giảm dần</option>
        </select>
      </div>

      <ProductGrid
        products={bulkSales.map((sale) => ({
          ...sale,
          expectedPrice: sale.expectedPrice ?? 0,
        }))}
        loading={loading}
      />
    </div>
  );
}
