'use client';

import MainLayout from '@/src/components/layout/MainLayout';
import {
  Users,
  Package,
  Truck,
  FileText,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

/* ================= MOCK DATA (HTX REALISTIC) ================= */

export const statusCards = [
  {
    key: 'TOTAL_FARMERS',
    value: 125,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    key: 'ACTIVE_SEASONS',
    value: 12,
    icon: <Package className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    key: 'COLLECTING_VOLUME',
    value: 34200,
    icon: <Truck className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    key: 'ACTIVE_CONTRACTS',
    value: 8,
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export const collections = [
  {
    id: '1',
    product: 'Lúa ST25',
    farmer: 'Nguyễn Văn A',
    quantity: 1200,
    progress: 75,
  },
  {
    id: '2',
    product: 'Xoài cát',
    farmer: 'Trần Thị B',
    quantity: 800,
    progress: 90,
  },
  {
    id: '3',
    product: 'Thanh long',
    farmer: 'Lê Văn C',
    quantity: 1500,
    progress: 40,
  },
];

export const announcements = [
  {
    id: '1',
    title: 'Thu gom lúa vụ hè thu',
    description: 'Bắt đầu từ 25/03',
  },
  {
    id: '2',
    title: 'Cập nhật giá xoài',
    description: '18,000đ/kg',
  },
];

export const actions = [
  {
    key: 'CREATE_COLLECTION',
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  {
    key: 'MANAGE_FARMERS',
    icon: <Users className="w-8 h-8" />,
  },
  {
    key: 'VIEW_REPORT',
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

/* ================= UI COMPONENTS ================= */

const StatusCards = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusCards.map((card) => (
        <div
          key={card.key}
          className="bg-white p-6 rounded-xl hover:shadow-lg transition"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
          >
            {card.icon}
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t(`DASHBOARD.STATUS.${card.key}`)}
          </p>

          <p className="text-3xl font-bold text-gray-900">
            {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ===== COLLECTIONS ===== */
const Collections = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {t('DASHBOARD.COLLECTIONS.TITLE')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('DASHBOARD.COLLECTIONS.SUBTITLE')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {collections.map((item) => (
          <div key={item.id} className="p-4 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">{item.product}</p>
                <p className="text-sm text-gray-500">{item.farmer}</p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                {item.quantity} kg
              </span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                {t('DASHBOARD.COLLECTIONS.PROGRESS')}
              </span>
              <span>{item.progress}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ===== ANNOUNCEMENTS ===== */
const Messages = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        {t('DASHBOARD.ANNOUNCEMENTS.TITLE')}
      </h2>

      <div className="space-y-2">
        {announcements.map((msg) => (
          <div
            key={msg.id}
            className="p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <p className="font-semibold">{msg.title}</p>
            <p className="text-sm text-gray-500">{msg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ===== QUICK ACTIONS ===== */
const QuickActions = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = (key: string) => {
    if (key === 'MANAGE_FARMERS') {
      router.push('/cooperative/members');
    }
    if (key === 'CREATE_COLLECTION') {
      router.push('/cooperative/posts');
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-2">
        {t('DASHBOARD.QUICK_ACTIONS.TITLE')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={() => handleClick(action.key)}
            className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition hover:scale-105"
          >
            <div className="flex justify-center mb-4">{action.icon}</div>

            <p className="text-center font-semibold">
              {t(`DASHBOARD.QUICK_ACTIONS.${action.key}`)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ================= PAGE ================= */

function HomeContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{t('DASHBOARD.HOME_TITLE')}</h1>

        <p className="text-gray-600 mt-2">{t('DASHBOARD.HOME_SUBTITLE')}</p>
      </div>

      <StatusCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Collections />
        </div>

        <Messages />
      </div>

      <QuickActions />
    </div>
  );
}

export default function Home() {
  return (
    <MainLayout>
      <HomeContent />
    </MainLayout>
  );
}
