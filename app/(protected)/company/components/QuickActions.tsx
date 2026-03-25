'use client';
import { ChevronRight } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import { Plus, Search, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors" />

      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h3 className="font-bold text-gray-900">
          {t('DASHBOARD.QUICK_ACTIONS.TITLE')}
        </h3>
      </div>

      <div className="space-y-3 relative z-10">
        <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-100 flex items-center justify-between px-5 transition-all hover:-translate-y-1 active:scale-95 group/btn">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight">
              Tạo yêu cầu mua mới
            </span>
          </div>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl flex items-center justify-between px-5 transition-all group/search"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gray-100 group-hover/search:bg-emerald-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-500 group-hover/search:text-emerald-600" />
            </div>
            <span className="font-bold tracking-tight text-sm">
              Tìm kiếm nguồn cung
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover/search:text-emerald-500" />
        </Button>
      </div>

      <p className="mt-6 text-[11px] text-gray-400 text-center font-medium italic">
        Sử dụng phím tắt{' '}
        <kbd className="bg-gray-100 px-1 rounded border">Ctrl + K</kbd> để tìm
        kiếm nhanh
      </p>
    </div>
  );
}
