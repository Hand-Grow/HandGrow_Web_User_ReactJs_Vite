'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle2, Truck, AlertCircle, ChevronRight } from 'lucide-react';
import React from 'react';

type Activity = {
  icon: React.ElementType;
  textKey: string;
  timeKey: string;
  timeValues?: Record<string, string | number>;
  statusColor: string; // Thêm màu sắc riêng cho từng trạng thái
};

const activities: Activity[] = [
  {
    icon: CheckCircle2,
    textKey: 'DASHBOARD.ACTIVITIES.CONTRACT_CONFIRMED',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.HOURS_AGO',
    timeValues: { count: 2 },
    statusColor: 'text-emerald-500 bg-emerald-50',
  },
  {
    icon: AlertCircle,
    textKey: 'DASHBOARD.ACTIVITIES.NEW_MESSAGE',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.HOURS_AGO',
    timeValues: { count: 5 },
    statusColor: 'text-amber-500 bg-amber-50',
  },
  {
    icon: Truck,
    textKey: 'DASHBOARD.ACTIVITIES.DELIVERY_SUCCESS',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.DAYS_AGO',
    timeValues: { count: 1 },
    statusColor: 'text-blue-500 bg-blue-50',
  },
];

export default function ActivitySection() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">
          {t('DASHBOARD.ACTIVITIES.TITLE')}
        </h3>
        <button className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
          {t('FILTER.ALL')} <ChevronRight size={14} />
        </button>
      </div>

      <div className="relative space-y-6">
        {/* Đường kẻ dọc tạo hiệu ứng Timeline */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-50" />

        {activities.map((a, i) => {
          const Icon = a.icon;

          return (
            <div key={i} className="group flex gap-4 relative z-10">
              {/* Icon Container với màu sắc động */}
              <div
                className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${a.statusColor}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0 group-last:pb-0">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {t(a.textKey, {
                    contractId: 'HD-2024-001',
                    cooperative: 'Tân Thành',
                  })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-neutral-400 font-medium italic">
                    {t(a.timeKey, a.timeValues)}
                  </p>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">
                    Mới
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
