'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SourcingHeader from '../components/SourcingHeader';
import FilterBar from '../components/FilterBar';
import { toast } from 'react-toastify';
import { marketplaceApi } from '@/src/services/marketplace/marketplaceApi';
import { PRODUCE_LABELS, PRODUCE_VALUES, ProduceType } from '@/src/constants';
import ProductGrid from '../components/ProductGrid';
import { MarketplacePost } from '@/src/types';

export default function SourcingPage() {
  const { t } = useTranslation();
  const [bulkSales, setBulkSales] = useState<MarketplacePost[]>([]);
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
    'relevant' | 'price_asc' | 'price_desc' | 'contact_price'
  >('relevant');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBulkSales();
  }, [filters, sortBy]);

  useEffect(() => {
    fetchBulkSales();
  }, [searchTerm]);

  const fetchBulkSales = async () => {
    try {
      setLoading(true);

      const response = await marketplaceApi.getBulkSales(filters);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.content || [];

      let sortedData = [...data];
      if (sortBy === 'price_asc') {
        sortedData.sort((a, b) => {
          if (a.expectedPrice === null && b.expectedPrice === null) return 0;
          if (a.expectedPrice === null) return 1;
          if (b.expectedPrice === null) return -1;
          return a.expectedPrice - b.expectedPrice;
        });
      } else if (sortBy === 'price_desc') {
        sortedData.sort(
          (a, b) => (b.expectedPrice || 0) - (a.expectedPrice || 0)
        );
      } else if (sortBy === 'contact_price') {
        sortedData.sort((a, b) => {
          if (a.expectedPrice === null && b.expectedPrice === null) return 0;
          if (a.expectedPrice === null) return -1;
          if (b.expectedPrice === null) return 1;
          return a.expectedPrice - b.expectedPrice;
        });
      } else if (sortBy === 'relevant') {
        sortedData.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      }
      if (searchTerm) {
        sortedData = sortedData.filter((item) =>
          item.coopName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filters.product && filters.product !== '') {
        if (filters.product === 'Tất cả') {
          // Không filter
        } else if (PRODUCE_VALUES.includes(filters.product as ProduceType)) {
          const selectedProduct = filters.product as ProduceType;

          if (selectedProduct === 'OTHER') {
            sortedData = sortedData.filter((item) => {
              const productType = item.productName as ProduceType;
              return productType === 'OTHER';
            });
          } else {
            sortedData = sortedData.filter(
              (item) => item.productName === selectedProduct
            );
          }
        } else {
          const entry = Object.entries(PRODUCE_LABELS).find(
            ([_, label]) => label === filters.product
          );

          if (entry) {
            const [produceType] = entry as [ProduceType, string];

            if (produceType === 'OTHER') {
              sortedData = sortedData.filter((item) => {
                const productType = item.productName as ProduceType;
                return productType === 'OTHER';
              });
            } else {
              sortedData = sortedData.filter(
                (item) => item.productName === produceType
              );
            }
          }
        }
      }

      setBulkSales(sortedData);
    } catch (error) {
      console.error(t('SOURCING.ERROR.FETCH_PRODUCTS'), error);

      let errorMessage = t('SOURCING.TOAST.FETCH_ERROR');

      const errorResponse = error as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      };

      if (errorResponse.response?.status === 401) {
        errorMessage = t('SOURCING.TOAST.UNAUTHORIZED');
      } else if (errorResponse.response?.status === 403) {
        errorMessage = t('SOURCING.TOAST.FORBIDDEN');
      } else if (errorResponse.response?.status === 404) {
        errorMessage = t('SOURCING.TOAST.NOT_FOUND');
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
    search?: string;
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
          {t('SOURCING.PRODUCTS.FOUND_COUNT', { count: bulkSales.length })}
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
                | 'contact_price'
            )
          }
        >
          <option value="relevant">{t('SOURCING.SORT.RELEVANT')}</option>
          <option value="price_asc">{t('SOURCING.SORT.PRICE_ASC')}</option>
          <option value="price_desc">{t('SOURCING.SORT.PRICE_DESC')}</option>
          <option value="contact_price">
            {t('SOURCING.SORT.CONTACT_PRICE')}
          </option>
        </select>
      </div>

      <ProductGrid products={bulkSales} loading={loading} />
    </div>
  );
}
