import {
  Users,
  Package,
  Zap,
  TrendingUp,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

/* ===== MOCK DATA ===== */
const statusCards = [
  {
    label: 'Tổng thành viên',
    value: 1250,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Kiện hàng chứng',
    value: 856,
    icon: <Package className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    label: 'Đang sản xuất',
    value: 342,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Bán cấp nhập',
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
    progress: 60,
    tag: 'Đang xử lý',
  },
  {
    id: '3',
    title: 'Phân bón Đạm',
    description: 'Lô 3 gồm 2 bao',
    amount: '156k',
    progress: 30,
    tag: 'Đang xử lý',
  },
];

const messages = [
  {
    id: '1',
    title: 'Công bố kỳ mới',
    description: 'Thông báo về kỳ sản xuất mới',
  },
  {
    id: '2',
    title: 'Hạn đăng ký',
    description: 'Hạn đăng ký mua vật tư tháng này',
  },
  {
    id: '3',
    title: 'Thông báo hệ thống',
    description: 'Bảo trì hệ thống cuối tuần',
  },
];

const actions = [
  {
    label: 'Tạo đơn mua hàng',
    icon: <ShoppingCart className="w-8 h-8" />,
    description: 'Tạo đơn mua hàng mới',
  },
  {
    label: 'Quản lý thành viên',
    icon: <Users className="w-8 h-8" />,
    description: 'Xem và chỉnh sửa thành viên',
  },
  {
    label: 'Thống kê sản xuất',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Theo dõi tiến độ sản xuất',
  },
];

/* ===== COMPONENTS ===== */

const StatusCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {statusCards.map((card) => (
      <div
        key={card.label}
        className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition"
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
        >
          {card.icon}
        </div>
        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
          {card.label}
        </p>
        <p className="text-3xl font-bold">{card.value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-2">
          +12% so với tháng trước
        </p>
      </div>
    ))}
  </div>
);

const Transactions = () => (
  <div className="bg-card p-6 rounded-xl border border-border">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold">Đơn mua gần đây</h2>
        <p className="text-sm text-muted-foreground">Các giao dịch mới nhất</p>
      </div>
      <span className="text-primary text-sm font-medium cursor-pointer">
        Xem tất cả →
      </span>
    </div>

    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="p-4 border rounded-lg">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-semibold">{tx.title}</p>
              <p className="text-sm text-muted-foreground">{tx.description}</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {tx.tag}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-primary">{tx.amount}</span>
            <span>{tx.progress}%</span>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${tx.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Messages = () => {
  const [selected, setSelected] = useState('1');

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <h2 className="text-xl font-bold mb-4">Thông báo</h2>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelected(msg.id)}
            className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer border
              ${
                selected === msg.id
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent hover:bg-secondary/40'
              }`}
          >
            <input
              type="radio"
              checked={selected === msg.id}
              onChange={() => setSelected(msg.id)}
            />
            <div className="flex-1">
              <p className="font-semibold">{msg.title}</p>
              <p className="text-sm text-muted-foreground">{msg.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions = () => (
  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8">
    <h2 className="text-3xl font-bold mb-2">Hành động nhanh</h2>
    <p className="text-sm opacity-80 mb-8">Các chức năng thường dùng</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <button
          key={action.label}
          className="bg-white/15 hover:bg-white/25 rounded-xl p-6 text-left transition hover:scale-105"
        >
          <div className="mb-4">{action.icon}</div>
          <h3 className="font-bold text-lg mb-1">{action.label}</h3>
          <p className="text-sm opacity-80">{action.description}</p>
        </button>
      ))}
    </div>
  </div>
);

/* ===== PAGE ===== */

export default function Home() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Trang chủ HTX</h1>
        <p className="text-muted-foreground mt-2">
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
