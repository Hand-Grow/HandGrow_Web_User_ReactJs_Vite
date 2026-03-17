'use client';

import { Image as ImageIcon } from 'lucide-react';

type Product = {
  name: string;
  tags: string[];
  origin: string;
  price: string;
  quantity: string;
  grade: string;
};

const products: Product[] = [
  {
    name: 'Lúa ST25',
    tags: ['VietGAP'],
    origin: 'An Giang',
    price: '9,000',
    quantity: '450',
    grade: 'Loại A: 70%, Loại B: 25%, Loại C: 5%',
  },
  {
    name: 'Gạo Jasmine',
    tags: ['VietGAP', 'Organic'],
    origin: 'Đồng Tháp',
    price: '12,000',
    quantity: '320',
    grade: 'Loại A: 80%, Loại B: 15%, Loại C: 5%',
  },
  {
    name: 'Lúa Nàng Hoa',
    tags: ['VietGAP'],
    origin: 'Kiên Giang',
    price: '11,000',
    quantity: '280',
    grade: 'Loại A: 75%, Loại B: 20%, Loại C: 5%',
  },
  {
    name: 'Gạo ST24',
    tags: ['VietGAP'],
    origin: 'Sóc Trăng',
    price: '8,500',
    quantity: '200',
    grade: 'Loại A: 70%, Loại B: 25%, Loại C: 5%',
  },
];

export default function ProductSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Nông sản khả dụng</h3>

        <button className="text-emerald-600 font-semibold text-sm hover:underline">
          Xem tất cả →
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">
        {products.map((p, i) => (
          <div
            key={i}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border border-neutral-200
              hover:shadow-md
              transition
              p-5
              flex
              justify-between
              gap-6
            "
          >
            {/* LEFT */}
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-neutral-400" />
              </div>

              {/* Info */}
              <div>
                <h4 className="font-semibold text-base mb-2">{p.name}</h4>

                <div className="flex gap-2 text-xs mb-2">
                  {p.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}

                  <span className="text-neutral-500">• {p.origin}</span>
                </div>

                <p className="text-xs text-neutral-500 mb-2">{p.grade}</p>

                <button className="text-emerald-600 text-sm font-semibold hover:underline">
                  Xem chi tiết & đặt hàng →
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col justify-between">
              <p className="text-orange-500 font-bold text-lg">
                {p.price} đ/kg
              </p>

              <p className="text-xs text-neutral-500">
                {p.quantity} tấn có sẵn
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
