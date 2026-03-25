'use client';

import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import React from 'react';

type Metric = {
  icon: React.ElementType;
  titleKey: string;
  value: string | number;
  change: string;
  changeType?: 'increase' | 'decrease';
  colorClass: string;
};

const metrics: Metric[] = [
  {
    icon: ShoppingCart,
    titleKey: 'DASHBOARD.METRICS.TOTAL_POSTS',
    value: 12,
    change: '+2',
    changeType: 'increase',
    colorClass: 'emerald',
  },
  {
    icon: Users,
    titleKey: 'DASHBOARD.METRICS.ACTIVE_COOPERATIVES',
    value: 8,
    change: '+1',
    changeType: 'increase',
    colorClass: 'blue',
  },
  {
    icon: Package,
    titleKey: 'DASHBOARD.METRICS.AVAILABLE_TONS',
    value: '1,250',
    change: '-50',
    changeType: 'decrease',
    colorClass: 'orange',
  },
  {
    icon: TrendingUp,
    titleKey: 'DASHBOARD.METRICS.MONTHLY_REVENUE',
    value: '2.8B',
    change: '+15%',
    changeType: 'increase',
    colorClass: 'purple',
  },
];

export default function MetricsRow() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        const isPositive = m.changeType === 'increase';
        const theme: Record<string, string> = {
          emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          blue: 'bg-blue-50 text-blue-600 border-blue-100',
          orange: 'bg-orange-50 text-orange-600 border-orange-100',
          purple: 'bg-purple-50 text-purple-600 border-purple-100',
        };

        return (
          <div
            key={i}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-5">
              <div
                className={`p-3 rounded-xl border ${theme[m.colorClass]} transition-transform group-hover:scale-110`}
              >
                <Icon size={22} />
              </div>

              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border ${
                  isPositive
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {m.change}
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-500 font-medium">
                {t(m.titleKey)}
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <p className="text-3xl font-bold text-gray-900 tracking-tight">
                  {typeof m.value === 'number'
                    ? m.value.toLocaleString()
                    : m.value}
                </p>
                {m.titleKey.includes('REVENUE') && (
                  <span className="text-xs font-bold text-gray-400">VNĐ</span>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
              <div
                className={`h-full opacity-40 transition-all duration-1000 ${theme[m.colorClass].split(' ')[1].replace('text-', 'bg-')}`}
                style={{ width: '40%' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
