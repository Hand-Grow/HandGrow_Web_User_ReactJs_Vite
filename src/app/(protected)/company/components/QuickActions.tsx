'use client';
import { useTranslation } from 'react-i18next';
export default function QuickActions() {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold mb-4">{t('DASHBOARD.QUICK_ACTIONS.TITLE')}</h3>

      <button className="w-full bg-primary text-white py-3 rounded-xl mb-3 hover:shadow-md transition">
        + {t('DASHBOARD.QUICK_ACTIONS.CREATE_PURCHASE_REQUEST')}
      </button>

      <button className="w-full bg-neutral-100 py-3 rounded-xl hover:bg-neutral-200 transition">
        {t('DASHBOARD.QUICK_ACTIONS.SEARCH_SUPPLY')}
      </button>
    </div>
  );
}
