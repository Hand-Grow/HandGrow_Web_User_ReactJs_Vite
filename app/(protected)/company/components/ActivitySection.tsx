'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import React from 'react';

type Activity = {
  icon: React.ElementType;
  textKey: string;
  timeKey: string;
  timeValues?: Record<string, string | number>;
};

const activities: Activity[] = [
  {
    icon: CheckCircle2,
    textKey: 'DASHBOARD.ACTIVITIES.CONTRACT_CONFIRMED',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.HOURS_AGO',
    timeValues: { count: 2 },
  },
  {
    icon: AlertCircle,
    textKey: 'DASHBOARD.ACTIVITIES.NEW_MESSAGE',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.HOURS_AGO',
    timeValues: { count: 5 },
  },
  {
    icon: Truck,
    textKey: 'DASHBOARD.ACTIVITIES.DELIVERY_SUCCESS',
    timeKey: 'DASHBOARD.ACTIVITIES.TIME.DAYS_AGO',
    timeValues: { count: 1 },
  },
];

export default function ActivitySection() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold mb-5">{t('DASHBOARD.ACTIVITIES.TITLE')}</h3>

      <div className="space-y-4">
        {activities.map((a, i) => {
          const Icon = a.icon;

          return (
            <div key={i} className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Icon size={18} className="text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {t(a.textKey, {
                    contractId: 'HD-2024-001',
                    cooperative: 'Tân Thành',
                  })}
                </p>
                <p className="text-xs text-neutral-500">
                  {t(a.timeKey, a.timeValues)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
