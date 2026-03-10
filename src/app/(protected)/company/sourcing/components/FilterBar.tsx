'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  PRODUCE_VALUES,
  PRODUCE_LABELS,
} from '../../../../../../constants/produce';
import React from 'react';
interface FilterBarProps {
  onFilterChange?: (filters: { product: string; search: string }) => void;
  onSearchChange?: (searchValue: string) => void;
}

const Chip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition
      ${
        active
          ? 'bg-emerald-600 text-white'
          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
      }
    `}
  >
    {label}
  </button>
);

export default function FilterBar({
  onFilterChange,
  onSearchChange,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('Tất cả');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
    onFilterChange?.({
      product: selectedProduct === 'Tất cả' ? '' : selectedProduct,
      search: value,
    });
  };

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
    onFilterChange?.({
      product: product === 'Tất cả' ? '' : product,
      search: searchTerm,
    });
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-5">
      <div className="flex items-center border rounded-xl px-4 py-3 bg-white">
        <Search size={18} className="text-neutral-400" />
        <input
          placeholder="Tìm kiếm tên hợp tác xã"
          value={searchTerm}
          onChange={handleSearch}
          className="ml-3 outline-none w-full text-sm"
        />
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-neutral-500 mb-2">Loại nông sản</p>
          <div className="flex flex-wrap gap-2">
            {['Tất cả', ...PRODUCE_VALUES].map((product) => (
              <Chip
                key={product}
                label={
                  product === 'Tất cả'
                    ? product
                    : PRODUCE_LABELS[product as keyof typeof PRODUCE_LABELS] ||
                      product
                }
                active={selectedProduct === product}
                onClick={() => handleProductSelect(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
