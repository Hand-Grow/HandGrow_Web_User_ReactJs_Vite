'use client';

import React from 'react';
import MainLayout from '@/src/components/layout/MainLayout';
import {
  Users,
  Package,
  Truck,
  FileText,
  ShoppingCart,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart as PieIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

/* ================= DATA STRUCTURES ================= */

const lineChartData = [
  { month: 'T1', revenue: 4200, volume: 2400 },
  { month: 'T2', revenue: 3800, volume: 3200 },
  { month: 'T3', revenue: 5100, volume: 4800 },
  { month: 'T4', revenue: 4700, volume: 3900 },
  { month: 'T5', revenue: 5900, volume: 5200 },
  { month: 'T6', revenue: 6200, volume: 6100 },
];

const pieData = [
  { name: 'Lúa ST25', value: 45, fill: '#10b981' },
  { name: 'Xoài Cát', value: 25, fill: '#f59e0b' },
  { name: 'Thanh Long', value: 20, fill: '#ec4899' },
  { name: 'Sầu Riêng', value: 10, fill: '#84cc16' },
];

const barData = [
  { name: 'Kho 1', san_luong: 4000, dinh_muc: 2400 },
  { name: 'Kho 2', san_luong: 3000, dinh_muc: 1398 },
  { name: 'Kho 3', san_luong: 2000, dinh_muc: 9800 },
  { name: 'Kho 4', san_luong: 2780, dinh_muc: 3908 },
];

const statusCards = [
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

const collections = [
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

const StatusCards = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusCards.map((card) => (
        <div
          key={card.key}
          className="bg-white p-6 rounded-2xl shadow-xl ring-1 ring-orange-100 transition-all duration-300 hover:ring-orange-400 hover:scale-105 group border-b-4 border-orange-400/20"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12 ${card.color}`}
          >
            {card.icon}
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">
            {t(`DASHBOARD.STATUS.${card.key}`)}
          </p>
          <p className="text-3xl font-black text-gray-900 font-sans leading-none">
            {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ===== BIỂU ĐỒ CỘT MỚI ===== */
const StockBarChart = () => (
  <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 h-100">
    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 font-sans">
      <BarChart3 className="text-purple-500" /> Phân Phối Kho Bãi
    </h2>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={barData}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          }}
        />
        <Bar
          dataKey="san_luong"
          name="Sản lượng thực tế"
          fill="#8b5cf6"
          radius={[6, 6, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const GrowthChart = () => (
  <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 h-100">
    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 font-sans">
      <TrendingUp className="text-emerald-500" /> Tăng Trưởng Sản Lượng Ký Kết
    </h2>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={lineChartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Lợi nhuận"
          stroke="#10b981"
          strokeWidth={4}
          dot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="volume"
          name="Sản lượng"
          stroke="#f59e0b"
          strokeWidth={4}
          dot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CropStructureChart = () => (
  <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 h-100">
    <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 font-sans">
      <PieIcon className="text-pink-500" /> Cơ Cấu Nông Sản
    </h2>
    <ResponsiveContainer width="100%" height="80%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={8}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

/* ================= MAIN LAYOUT ================= */

function HomeContent() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="p-4 space-y-10 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-950 tracking-tight leading-tight font-sans">
            {t('DASHBOARD.HOME_TITLE')}
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            Hệ thống quản lý dữ liệu nông nghiệp thông minh
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white shadow-lg p-4 rounded-2xl border border-orange-100">
          <Calendar className="text-orange-500 w-6 h-6" />
          <span className="font-bold text-gray-800 text-lg">
            25 Tháng 03, 2026
          </span>
        </div>
      </div>

      <StatusCards />

      {/* Charts Section: 3 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <GrowthChart />
        <StockBarChart />
        <CropStructureChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl shadow-2xl border border-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Tiến Độ Thu Gom Vùng Trồng
          </h2>
          <div className="space-y-8">
            {collections.map((item) => (
              <div key={item.id} className="group">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {item.product}
                    </h3>
                    <p className="text-gray-400 font-medium italic">
                      Kỹ thuật: {item.farmer}
                    </p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-black px-5 py-2 rounded-2xl border border-emerald-100 shadow-sm">
                    {item.quantity.toLocaleString()} kg
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full p-1 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-end mt-2 text-sm font-black text-emerald-600 uppercase tracking-tighter">
                  {item.progress}% Hoàn tất mục tiêu
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">
            Bảng Tin HTX
          </h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-orange-50 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900">Thu gom lúa vụ hè thu</h4>
              <p className="text-sm text-gray-600 mt-1">
                Lịch thu gom bắt đầu từ thứ Hai tuần tới tại khu vực cụm 1.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900">Giá nông sản hôm nay</h4>
              <p className="text-sm text-gray-600 mt-1">
                Xoài Hòa Lộc giữ giá 18.000đ/kg. Thị trường đang ổn định.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section: Gradient Xanh Lá */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500 rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <h2 className="text-4xl font-black text-white mb-10 relative z-10 tracking-tight">
          Thao Tác Nhanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <button
            onClick={() => router.push('/cooperative/posts')}
            className="flex flex-col items-center gap-5 bg-white/20 hover:bg-white text-white hover:text-emerald-700 p-10 rounded-[32px] transition-all duration-500 hover:-translate-y-3 border border-white/20 shadow-xl group"
          >
            <ShoppingCart className="w-12 h-12 transition-transform group-hover:scale-125" />
            <span className="font-black text-xl uppercase tracking-wider">
              Tạo Đợt Thu Gom
            </span>
          </button>

          <button
            onClick={() => router.push('/cooperative/members')}
            className="flex flex-col items-center gap-5 bg-white/20 hover:bg-white text-white hover:text-emerald-700 p-10 rounded-[32px] transition-all duration-500 hover:-translate-y-3 border border-white/20 shadow-xl group"
          >
            <Users className="w-12 h-12 transition-transform group-hover:scale-125" />
            <span className="font-black text-xl uppercase tracking-wider">
              Quản Lý Nông Dân
            </span>
          </button>

          <button className="flex flex-col items-center gap-5 bg-white/20 hover:bg-white text-white hover:text-emerald-700 p-10 rounded-[32px] transition-all duration-500 hover:-translate-y-3 border border-white/20 shadow-xl group">
            <BarChart3 className="w-12 h-12 transition-transform group-hover:scale-125" />
            <span className="font-black text-xl uppercase tracking-wider">
              Báo Cáo Tổng Hợp
            </span>
          </button>
        </div>
      </div>
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
