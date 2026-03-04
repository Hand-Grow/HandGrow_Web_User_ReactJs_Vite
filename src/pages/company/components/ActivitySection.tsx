import { CheckCircle2, Truck, AlertCircle } from 'lucide-react';

const activities = [
  {
    icon: CheckCircle2,
    text: 'Hợp đồng HD-2024-001 đã xác nhận',
    time: '2 giờ trước',
  },
  {
    icon: AlertCircle,
    text: 'Tin nhắn mới từ HTX Tân Thành',
    time: '5 giờ trước',
  },
  { icon: Truck, text: 'Giao hàng thành công', time: '1 ngày trước' },
];

export default function ActivitySection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold mb-5">Hoạt động gần đây</h3>

      <div className="space-y-4">
        {activities.map((a, i) => {
          const Icon = a.icon;

          return (
            <div key={i} className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Icon size={18} className="text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">{a.text}</p>
                <p className="text-xs text-neutral-500">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
