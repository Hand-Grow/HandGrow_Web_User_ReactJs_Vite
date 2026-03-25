'use client';

import { MapPin, Scale, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Product = {
  name: string;
  origin: string;
  price: string;
  quantity: string;
  imageUrl: string;
  grade: {
    a: string;
    b: string;
    c: string;
  };
};

const products: Product[] = [
  {
    name: 'Lúa ST25',
    origin: 'An Giang',
    price: '9,000',
    quantity: '450',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200',
    grade: { a: '70', b: '25', c: '5' },
  },
  {
    name: 'Gạo Jasmine',
    origin: 'Đồng Tháp',
    price: '12,000',
    quantity: '320',
    imageUrl:
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=200',
    grade: { a: '80', b: '15', c: '5' },
  },
  {
    name: 'Lúa Nàng Hoa',
    origin: 'Kiên Giang',
    price: '11,000',
    quantity: '280',
    imageUrl:
      'https://cdn.tgdd.vn/Files/2022/11/14/1487005/gia-lua-gao-hom-nay-14-11-2022-lua-nang-hoa-9-tang-200-dong-kg-202211141437371040.jpg',
    grade: { a: '75', b: '20', c: '5' },
  },
  {
    name: 'Gạo ST24',
    origin: 'Sóc Trăng',
    price: '8,500',
    quantity: '200',
    imageUrl:
      'https://vuagaovn.com/upload/1/products/l_1517283033_gao-st24.png',
    grade: { a: '70', b: '25', c: '5' },
  },
];

export default function ProductSection() {
  const { t } = useTranslation();

  const formatGrade = (grade: Product['grade']) => {
    return `Loại A: ${grade.a}%, Loại B: ${grade.b}%, Loại C: ${grade.c}%`;
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">
          Nông sản khả dụng
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-[24px] border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
          >
            <div className="flex gap-4">
              {/* Ảnh sản phẩm */}
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Thông tin chính */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-lg text-gray-900 truncate">
                    {p.name}
                  </h4>
                  <p className="text-orange-500 font-black text-xl whitespace-nowrap">
                    {p.price}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate">{p.origin}</span>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-3 font-medium">
                  <Scale className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate bg-gray-50 px-2 py-1 rounded-md w-full">
                    {formatGrade(p.grade)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer của Card */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="text-xs text-gray-400">
                <span className="font-bold text-gray-600 text-sm">
                  {p.quantity} tấn
                </span>{' '}
                có sẵn
              </div>

              <button className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                Xem chi tiết & đặt hàng <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
