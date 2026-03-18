import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';

const metrics = [
  { icon: ShoppingCart, title: 'Tổng tin đăng', value: 12, change: '+2' },
  { icon: Users, title: 'HTX hoạt động', value: 8, change: '+1' },
  { icon: Package, title: 'Tấn khả dụng', value: '1,250', change: '-50' },
  { icon: TrendingUp, title: 'Doanh thu tháng', value: '2.8B', change: '+15%' },
];

export default function MetricsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        const positive = !m.change.includes('-');

        return (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>

              <span
                className={`text-sm font-semibold ${
                  positive ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {m.change}
              </span>
            </div>

            <p className="text-sm text-neutral-500">{m.title}</p>
            <p className="text-3xl font-bold mt-1">{m.value}</p>
          </div>
        );
      })}
    </div>
  );
}
