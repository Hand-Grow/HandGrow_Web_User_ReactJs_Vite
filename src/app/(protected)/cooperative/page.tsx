'use client';

import MainLayout from '@/src/components/layout/MainLayout';
import { Users, Package, Zap, TrendingUp, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
/* ===== MOCK DATA ===== */
const statusCards = [
  {
    label: 'Tổng thành viên',
    value: 125,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    label: 'Kiện hàng chung',
    value: 856,
    icon: <Package className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    label: 'Đang thu gom',
    value: 342,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Bán hợp đồng',
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
    tag: 'Đang xử lý',
  },
  {
    id: '2',
    title: 'Lúa giống ST25',
    description: 'Lô 2 gồm 1 bao',
    amount: '102k',
    progress: 90,
    tag: 'Đang xử lý',
  },
  {
    id: '3',
    title: 'Phân bón Đạm',
    description: 'Lô 3 gồm 2 bao',
    amount: '156k',
    progress: 40,
    tag: 'Đang xử lý',
  },
];

const messages = [
  {
    id: '1',
    title: 'Công bố kỳ mới',
    description: 'Đăng dự án sản xuất mới nân dựa',
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
    label: 'Tạo đơn mua hàng',
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  {
    label: 'Quản lý thành viên',
    icon: <Users className="w-8 h-8" />,
  },
  {
    label: 'Thống kê sản xuất',
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

/* ===== COMPONENTS ===== */

const StatusCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {statusCards.map((card) => (
      <div
        key={card.label}
        className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
        >
          {card.icon}
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
          {card.label}
        </p>
        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
        <p className="text-xs text-gray-400 mt-2">+12% so với tháng trước</p>
      </div>
    ))}
  </div>
);

const Transactions = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Đơn mua chung</h2>
        <p className="text-sm text-gray-500">Danh sách giao dịch</p>
      </div>
      <span className="text-emerald-600 text-sm font-medium cursor-pointer hover:underline">
        Xem tất cả →
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
              {tx.tag}
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

const Messages = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Tin nhắn mới</h2>

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
  const router = useRouter();

  const handleActionClick = (label: string) => {
    if (label === 'Quản lý thành viên') {
      router.push('/cooperative/members');
    }
  };

  return (
    <div className="bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-2">Hành động nhanh</h2>
      <p className="text-sm opacity-90 mb-8">Các chức năng thường dùng</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleActionClick(action.label)}
            className="bg-white/20 hover:bg-white/30 rounded-xl p-6 text-left transition hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{action.icon}</div>
            <h3 className="font-bold text-lg text-center">{action.label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ===== PAGE ===== */

function HomeContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Trang chủ HTX</h1>
        <p className="text-gray-600 mt-2">
          Chào mừng bạn đến với hệ thống quản lý hợp tác xã
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

export default function Home() {
  return (
    <MainLayout>
      <HomeContent />
    </MainLayout>
  );
}
