'use client';

import { useTranslation } from 'react-i18next';
import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';
import React from 'react';

type Metric = {
  icon: React.ElementType;
  titleKey: string;
  value: string | number;
  change: string;
  changeType?: 'increase' | 'decrease';
};

const metrics: Metric[] = [
  {
    icon: ShoppingCart,
    titleKey: 'DASHBOARD.METRICS.TOTAL_POSTS',
    value: 12,
    change: '+2',
    changeType: 'increase',
  },
  {
    icon: Users,
    titleKey: 'DASHBOARD.METRICS.ACTIVE_COOPERATIVES',
    value: 8,
    change: '+1',
    changeType: 'increase',
  },
  {
    icon: Package,
    titleKey: 'DASHBOARD.METRICS.AVAILABLE_TONS',
    value: '1,250',
    change: '-50',
    changeType: 'decrease',
  },
  {
    icon: TrendingUp,
    titleKey: 'DASHBOARD.METRICS.MONTHLY_REVENUE',
    value: '2.8B',
    change: '+15%',
    changeType: 'increase',
  },
];

export default function MetricsRow() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        const isPositive = m.changeType === 'increase';
        const changeText =
          m.changeType === 'increase'
            ? t('DASHBOARD.METRICS.INCREASE', { value: m.change })
            : t('DASHBOARD.METRICS.DECREASE', { value: m.change });

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
                  isPositive ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {changeText}
              </span>
            </div>

            <p className="text-sm text-neutral-500">{t(m.titleKey)}</p>
            <p className="text-3xl font-bold mt-1">
              {typeof m.value === 'number'
                ? t('DASHBOARD.METRICS.NUMBER', { count: m.value })
                : m.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
