import { Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold mb-4">Thao tác nhanh</h3>

      <Button className="w-full bg-green-600 hover:bg-green-700">
        <Plus className="w-4 h-4" />
        Tạo yêu cầu mua mới
      </Button>

      <Button variant="outline" className="w-full">
        Tìm kiếm nguồn cung
      </Button>
    </div>
  );
}
