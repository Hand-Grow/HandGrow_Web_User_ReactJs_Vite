'use client';

import { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import MainLayout from '@/src/components/layout/MainLayout';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
import InputField from '@/components/common/InputField';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

interface PurchaseOrder {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
  location: string;
  status: 'active' | 'completed' | 'cancelled';
  registrations: number;
  progress: number;
}

const mockPurchases: PurchaseOrder[] = [
  {
    id: '1',
    name: 'Phân NPK 16-16-8',
    quantity: 5000,
    unit: 'kg',
    price: 12000,
    totalPrice: 60000000,
    startDate: '15/01/2024',
    endDate: '30/01/2024',
    location: 'An Phước',
    status: 'active',
    registrations: 12,
    progress: 75,
  },
  {
    id: '2',
    name: 'Lúa giống ST25',
    quantity: 1000,
    unit: 'kg',
    price: 50000,
    totalPrice: 50000000,
    startDate: '01/02/2024',
    endDate: '15/02/2024',
    location: 'Tây Phú',
    status: 'active',
    registrations: 8,
    progress: 90,
  },
  {
    id: '3',
    name: 'Phân Đạm Urê',
    quantity: 3000,
    unit: 'kg',
    price: 8000,
    totalPrice: 24000000,
    startDate: '20/01/2024',
    endDate: '31/01/2024',
    location: 'Huyền Tài Phú',
    status: 'completed',
    registrations: 15,
    progress: 100,
  },
];

const statusConfig = {
  active: { label: 'Đang diễn ra', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Hoàn thành', color: 'bg-blue-100 text-blue-700' },
  cancelled: { label: 'Hủy', color: 'bg-red-100 text-red-700' },
};

export function CreatePurchaseDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo đơn mua chung mới</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <InputField
            label="Tên sản phẩm"
            placeholder="Ví dụ: Phân bón, Hạt giống..."
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Số lượng" type="number" placeholder="1000" />
            <InputField
              label="Đơn giá (đồng)"
              type="number"
              placeholder="10000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Từ ngày" type="date" />
            <InputField label="Đến ngày" type="date" />
          </div>

          <InputField label="Nơi giao" placeholder="An Phước, Tây Phú..." />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>

            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => {
                toast.success('Đơn mua chung đã được tạo thành công');
                onOpenChange(false);
              }}
            >
              Tạo đơn
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ================= DETAIL DIALOG ================= */
export function PurchaseDetailDialog({
  purchase,
  open,
  onOpenChange,
}: {
  purchase: PurchaseOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!purchase) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{purchase.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Trạng thái</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[purchase.status].color}`}
            >
              {statusConfig[purchase.status].label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Số lượng</p>
              <p className="text-lg font-bold">{purchase.quantity}</p>
              <p className="text-xs text-gray-500">{purchase.unit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đơn giá</p>
              <p className="text-lg font-bold">
                {(purchase.price / 1000).toFixed(1)}k
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiến độ</p>
              <p className="text-lg font-bold">{purchase.progress}%</p>
            </div>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => {
              toast.loading(`Xem chi tiết ${purchase.name}`);
              onOpenChange(false);
            }}
          >
            Xem chi tiết
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================= MAIN CONTENT ================= */
function PurchasesContent() {
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseOrder | null>(null);

  const filtered = mockPurchases.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mua chung vật tư</h1>
        <p className="text-gray-600 mt-1">HTX Nông nghiệp An Phước</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button
          className="bg-green-600 hover:bg-green-700 gap-2"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Tạo đơn
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((purchase) => (
          <div key={purchase.id} className="border rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">{purchase.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${statusConfig[purchase.status].color}`}
              >
                {statusConfig[purchase.status].label}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 bg-transparent"
                onClick={() => {
                  setSelectedPurchase(purchase);
                  setDetailOpen(true);
                }}
              >
                <Eye className="w-4 h-4" /> Xem
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 bg-transparent"
              >
                <Edit className="w-4 h-4" /> Sửa
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 bg-transparent"
              >
                <Trash2 className="w-4 h-4" /> Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreatePurchaseDialog open={createOpen} onOpenChange={setCreateOpen} />
      <PurchaseDetailDialog
        purchase={selectedPurchase}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}

/* ================= PAGE ================= */
export default function PurchasesPage() {
  return (
    <MainLayout>
      <PurchasesContent />
    </MainLayout>
  );
}
