'use client';

import MainLayout from '@/src/components/layout/MainLayout';
import { Users, Package, Zap, TrendingUp, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

/* ===== MOCK DATA ===== */
const statusCards = [
  {
    key: 'TOTAL_MEMBERS',
    value: 125,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    key: 'TOTAL_PACKAGES',
    value: 856,
    icon: <Package className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    key: 'COLLECTING',
    value: 342,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    key: 'CONTRACT_SALES',
    value: 628,
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

const transactions = [
  {
    id: '1',
    title: 'Phân bón lá tổng hợp',
    description: 'Lô 1 gồm 1 bao',
    amount: '75k',
    progress: 75,
  },
  {
    id: '2',
    title: 'Lúa giống ST25',
    description: 'Lô 2 gồm 1 bao',
    amount: '102k',
    progress: 90,
  },
  {
    id: '3',
    title: 'Phân bón Đạm',
    description: 'Lô 3 gồm 2 bao',
    amount: '156k',
    progress: 40,
  },
];

const messages = [
  {
    id: '1',
    title: 'Công bố kỳ mới',
    description: 'Đăng dự án sản xuất mới',
  },
  {
    id: '2',
    title: 'Công bố B',
    description: 'Còn ít nhân để để cầu chuyên cuối',
  },
  {
    id: '3',
    title: 'Công bố D',
    description: 'Còn ít nhân để để cầu chuyên cuối',
  },
];

const actions = [
  {
    key: 'CREATE_ORDER',
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  {
    key: 'MANAGE_MEMBERS',
    icon: <Users className="w-8 h-8" />,
  },
  {
    key: 'PRODUCTION_STATS',
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

/* ===== COMPONENTS ===== */

const StatusCards = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card) => (
          <div
            key={card.key}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
            >
              {card.icon}
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              {card.key}
            </p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-400 mt-2">Month compare</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusCards.map((card) => (
        <div
          key={card.key}
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
          >
            {card.icon}
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t(`DASHBOARD.STATUS.${card.key}`)}
          </p>

          <p className="text-3xl font-bold text-gray-900">{card.value}</p>

          <p className="text-xs text-gray-400 mt-2">
            {t('DASHBOARD.STATUS.MONTH_COMPARE')}
          </p>
        </div>
      ))}
    </div>
  );
};

const Transactions = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
            <p className="text-sm text-gray-500">Today&apos;s transactions</p>
          </div>
          <span className="text-emerald-600 text-sm font-medium">
            View all →
          </span>
        </div>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{tx.title}</p>
                  <p className="text-sm text-gray-500">{tx.description}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  Processing
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-emerald-600">
                  {tx.amount}
                </span>
                <span className="text-gray-600">{tx.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${tx.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {t('DASHBOARD.TRANSACTIONS.TITLE')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('DASHBOARD.TRANSACTIONS.SUBTITLE')}
          </p>
        </div>

        <span className="text-emerald-600 text-sm font-medium cursor-pointer hover:underline">
          {t('DASHBOARD.TRANSACTIONS.VIEW_ALL')} →
        </span>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{tx.title}</p>
                <p className="text-sm text-gray-500">{tx.description}</p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                {t('DASHBOARD.TRANSACTIONS.PROCESSING')}
              </span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-emerald-600">{tx.amount}</span>
              <span className="text-gray-600">{tx.progress}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${tx.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Messages = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start gap-3 p-4 rounded-lg border border-transparent"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{msg.title}</p>
                <p className="text-sm text-gray-500">{msg.description}</p>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {t('DASHBOARD.MESSAGES.TITLE')}
      </h2>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent transition"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{msg.title}</p>
              <p className="text-sm text-gray-500">{msg.description}</p>
            </div>

            <div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleActionClick = (key: string) => {
    if (key === 'MANAGE_MEMBERS') {
      router.push('/cooperative/members');
    }
  };

  if (!mounted) {
    return (
      <div className="bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Quick Actions</h2>
        <p className="text-sm opacity-90 mb-8">Quick access to common tasks</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <div
              key={action.key}
              className="bg-white/20 rounded-xl p-6 text-left"
            >
              <div className="mb-4 flex justify-center">{action.icon}</div>
              <h3 className="font-bold text-lg text-center">{action.key}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-2">
        {t('DASHBOARD.QUICK_ACTIONS.TITLE')}
      </h2>

      <p className="text-sm opacity-90 mb-8">
        {t('DASHBOARD.QUICK_ACTIONS.SUBTITLE')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={() => handleActionClick(action.key)}
            className="bg-white/20 hover:bg-white/30 rounded-xl p-6 text-left transition hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{action.icon}</div>

            <h3 className="font-bold text-lg text-center">
              {t(`DASHBOARD.QUICK_ACTIONS.${action.key}`)}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ===== PAGE ===== */

function HomeContent() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder trong SSR
  if (!mounted) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Cooperative Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your
            cooperative today.
          </p>
        </div>

        <StatusCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Transactions />
          </div>
          <Messages />
        </div>
        <QuickActions />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {t('DASHBOARD.HOME_TITLE')}
        </h1>

        <p className="text-gray-600 mt-2"> {t('DASHBOARD.HOME_SUBTITLE')} </p>
      </div>

      <StatusCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Transactions />
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
