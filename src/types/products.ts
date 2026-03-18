export interface Product {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  name: string;
  category: 'FERTILIZER' | 'SEED' | 'PESTICIDE' | 'MACHINERY' | 'OTHER';
  unit: string;
  basePrice: number;
  description: string;
  imageUrl: string;
  imageUrls?: string[];
  attributes: Record<string, unknown>;
  priceTiers: {
    minQty: number;
    price: number;
  }[];
}

export interface PriceTier {
  minQty: string;
  price: string;
}

export const categoryOptions = [
  { value: 'FERTILIZER', label: 'Phân bón' },
  { value: 'SEED', label: 'Giống cây trồng' },
  { value: 'PESTICIDE', label: 'Thuốc BVTV' },
  { value: 'MACHINERY', label: 'Máy móc' },
  { value: 'OTHER', label: 'Khác' },
] as const;
