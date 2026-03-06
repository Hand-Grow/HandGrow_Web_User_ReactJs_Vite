'use client';

import MainLayout from '@/components/layout/MainLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const distributionData = [
  { name: 'Q1', Phúc: 45, Đạm: 65, KCl: 52 },
  { name: 'Q2', Phúc: 78, Đạm: 55, KCl: 72 },
  { name: 'Q3', Phúc: 88, Đạm: 72, KCl: 68 },
  { name: 'Q4', Phúc: 65, Đạm: 45, KCl: 58 },
];

const forecastData = [
  { name: 'Lúa A (Dẻn dũa)', value: 75 },
  { name: 'Lúa B (Tài lộc)', value: 23 },
  { name: 'Lúa C (Phác)', value: 5 },
];

function ReportsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Báo cáo & Phân tích
        </h1>
        <p className="text-gray-600 mt-1">Thống kê và dự báo hoạt động HTX</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm">Được phân bổ</p>
              <p className="text-4xl font-bold mt-2">125</p>
              <p className="text-green-100 text-sm mt-1">Tấn</p>
            </div>
            <div className="text-5xl opacity-20">📦</div>
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm">Tổng công nợ</p>
              <p className="text-4xl font-bold mt-2">280</p>
              <p className="text-blue-100 text-sm mt-1">Số</p>
            </div>
            <div className="text-5xl opacity-20">💰</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          Phân bổ theo loại cây hồng
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
              }}
            />
            <Legend />
            <Bar dataKey="Phúc" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Đạm" fill="#f97316" radius={[8, 8, 0, 0]} />
            <Bar dataKey="KCl" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          Phân loại chủ lương dự kiến
        </h2>
        <div className="space-y-4">
          {forecastData.map((item, index) => {
            const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500'];
            return (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${colors[index]} h-3 rounded-full`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <MainLayout>
      <ReportsContent />
    </MainLayout>
  );
}
