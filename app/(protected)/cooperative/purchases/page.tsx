'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Eye,
  Calendar,
  TrendingUp,
  Users,
  Package,
} from 'lucide-react';
import toast from 'react-hot-toast';
import React from 'react';

import MainLayout from '@/src/components/layout/MainLayout';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import InputField from '@/src/components/common/InputField';
import httpClient from '@/src/services/http/httpClient';

interface Product {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  name: string;
  category: 'FERTILIZER' | 'SEED' | 'PESTICIDE' | 'MACHINERY' | 'OTHER';
  unit: string;
  basePrice: number;
  description: string;
  imageUrl: string;
  attributes: Record<string, unknown>;
  priceTiers: {
    minQty: number;
    price: number;
  }[];
}

interface CampaignParticipation {
  id: string;
  farmerId: string;
  farmerName: string;
  committedQty: number;
  joinedAt: string;
}

interface GroupBuyCampaign {
  id: string;
  cooperativeName: string;
  productName: string;
  productImageUrl: string;
  title: string;
  description: string;
  status: 'GATHERING' | 'CLOSED' | 'COMPLETED';
  deadlineDate: string;
  totalCommittedQty: number;
  currentUnitPrice: number;
  participationCount: number;
  progressPercent: number;
  nextTierLabel: string;
}

type PurchaseOrder = GroupBuyCampaign;

// API functions
const fetchCampaigns = async (): Promise<GroupBuyCampaign[]> => {
  try {
    console.log('Fetching cooperative campaigns...');
    const response = await httpClient.get(
      '/api/v1/group-buy/campaigns/cooperative/me'
    );
    console.log('Campaigns response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching all products...');
    const response = await httpClient.get('/api/v1/products', {
      params: {
        page: 0,
        size: 50,
        sort: ['name,asc'],
      },
    });
    console.log('Products response:', response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const createCampaign = async (campaignData: {
  productId: string;
  title: string;
  description: string;
  deadlineDate: string;
}): Promise<GroupBuyCampaign | null> => {
  try {
    console.log('Creating campaign with data:', campaignData);
    const response = await httpClient.post(
      '/api/v1/group-buy/campaigns',
      campaignData
    );
    console.log('Campaign created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    return null;
  }
};

const closeCampaign = async (campaignId: string): Promise<boolean> => {
  try {
    console.log('Closing campaign:', campaignId);
    await httpClient.post(`/api/v1/group-buy/campaigns/${campaignId}/close`);
    console.log('Campaign closed successfully');
    return true;
  } catch (error) {
    console.error('Error closing campaign:', error);
    return false;
  }
};

const fetchCampaignParticipations = async (
  campaignId: string
): Promise<CampaignParticipation[]> => {
  try {
    console.log('Fetching participations for campaign:', campaignId);
    const response = await httpClient.get(
      `/api/v1/group-buy/campaigns/${campaignId}/participations`
    );
    console.log('Participations response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching participations:', error);
    return [];
  }
};

const statusConfig = {
  GATHERING: { label: 'Đang tập kết', color: 'bg-green-100 text-green-700' },
  CLOSED: { label: 'Đã đóng', color: 'bg-yellow-100 text-yellow-700' },
  COMPLETED: { label: 'Hoàn thành', color: 'bg-blue-100 text-blue-700' },
};

/* ================= CREATE CAMPAIGN DIALOG ================= */
function CreatePurchaseDialog({
  open,
  onOpenChange,
  onCampaignCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCampaignCreated: () => void;
}) {
  const [formData, setFormData] = useState({
    productId: '',
    title: '',
    description: '',
    deadlineDate: '',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch products khi dialog mở
  useEffect(() => {
    if (open) {
      loadProducts();
    }
  }, [open]);

  const loadProducts = async () => {
    setLoadingProducts(true);
    const productList = await fetchProducts();
    console.log('Setting products:', productList);
    setProducts(productList);
    setLoadingProducts(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productId || !formData.title || !formData.deadlineDate) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const result = await createCampaign(formData);

    if (result) {
      toast.success('Đơn mua chung đã được tạo thành công');
      setFormData({
        productId: '',
        title: '',
        description: '',
        deadlineDate: '',
      });
      onOpenChange(false);
      onCampaignCreated();
    } else {
      toast.error('Tạo đơn mua chung thất bại');
    }
  };

  return open ? (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tạo đơn mua chung mới</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4 rotate-45" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sản phẩm
            </label>
            <div className="flex gap-2">
              {loadingProducts ? (
                <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-500">
                  Đang tải sản phẩm...
                </div>
              ) : products.length === 0 ? (
                <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-500">
                  Chưa có sản phẩm nào. Vui lòng liên hệ Enterprise để tạo sản
                  phẩm.
                </div>
              ) : (
                <>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.productId}
                    onChange={(e) =>
                      setFormData({ ...formData, productId: e.target.value })
                    }
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.enterpriseName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          <InputField
            label="Tiêu đề"
            placeholder="Ví dụ: Mua chung Phân bón NPK..."
            value={formData.title}
            onChangeValue={(value) =>
              setFormData({ ...formData, title: value })
            }
            required
          />

          <InputField
            label="Mô tả"
            placeholder="Mô tả chi tiết về đợt mua chung"
            value={formData.description}
            onChangeValue={(value) =>
              setFormData({ ...formData, description: value })
            }
          />

          <InputField
            label="Hạn chót"
            type="date"
            value={formData.deadlineDate}
            onChangeValue={(value) =>
              setFormData({ ...formData, deadlineDate: value })
            }
            required
          />

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
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={products.length === 0}
            >
              Tạo đơn
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

/* ================= CAMPAIGN DETAIL DIALOG ================= */
function PurchaseDetailDialog({
  purchase,
  open,
  onOpenChange,
}: {
  purchase: PurchaseOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [participations, setParticipations] = useState<CampaignParticipation[]>(
    []
  );
  const [loadingParticipations, setLoadingParticipations] = useState(false);

  useEffect(() => {
    if (open && purchase) {
      loadParticipations();
    }
  }, [open, purchase]);

  const loadParticipations = async () => {
    if (!purchase) return;

    setLoadingParticipations(true);
    const data = await fetchCampaignParticipations(purchase.id);
    setParticipations(data);
    setLoadingParticipations(false);
  };

  const handleCloseCampaign = async () => {
    if (!purchase) return;

    const success = await closeCampaign(purchase.id);
    if (success) {
      toast.success('Đã đóng chiến dịch mua chung');
      onOpenChange(false);
      // Reload page data
      window.location.reload();
    } else {
      toast.error('Đóng chiến dịch thất bại');
    }
  };

  if (!purchase) return null;

  return open ? (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{purchase.title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4 rotate-45" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Thông tin sản phẩm</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Sản phẩm:</span>
                <p className="font-medium">{purchase.productName}</p>
              </div>
              <div>
                <span className="text-gray-600">HTX:</span>
                <p className="font-medium">{purchase.cooperativeName}</p>
              </div>
            </div>
          </div>

          {/* Campaign Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Trạng thái</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[purchase.status].color}`}
            >
              {statusConfig[purchase.status].label}
            </span>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div>
              <p className="text-sm text-gray-600">Số lượng</p>
              <p className="text-lg font-bold">{purchase.totalCommittedQty}</p>
              <p className="text-xs text-gray-500">đã đăng ký</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đơn giá</p>
              <p className="text-lg font-bold">
                {(purchase.currentUnitPrice / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-gray-500">VNĐ</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Người tham gia</p>
              <p className="text-lg font-bold">{purchase.participationCount}</p>
              <p className="text-xs text-gray-500">người</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiến độ</p>
              <p className="text-lg font-bold">{purchase.progressPercent}%</p>
              <p className="text-xs text-gray-500">{purchase.nextTierLabel}</p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Hạn chót:</span>
            <span className="text-sm font-medium">
              {new Date(purchase.deadlineDate).toLocaleDateString('vi-VN')}
            </span>
          </div>

          {/* Participations */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Danh sách tham gia ({participations.length})
            </h3>

            {loadingParticipations ? (
              <p className="text-sm text-gray-500">Đang tải...</p>
            ) : participations.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa có người tham gia</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {participations.map((participation) => (
                  <div
                    key={participation.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">
                      {participation.farmerName || 'Nông dân'}
                    </span>
                    <span className="text-sm font-medium">
                      {participation.committedQty} kg
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {purchase.status === 'GATHERING' && (
              <Button
                className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                onClick={handleCloseCampaign}
              >
                Đóng chiến dịch
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

/* ================= MAIN CONTENT ================= */
function PurchasesContent() {
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseOrder | null>(null);
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = async () => {
    setLoading(true);
    const campaigns = await fetchCampaigns();
    setPurchases(campaigns);
    setLoading(false);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const filtered = purchases.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.productName.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Tìm kiếm theo tên sản phẩm hoặc tiêu đề..."
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang tập kết</p>
              <p className="text-2xl font-bold text-green-600">
                {purchases.filter((p) => p.status === 'GATHERING').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã đóng</p>
              <p className="text-2xl font-bold text-yellow-600">
                {purchases.filter((p) => p.status === 'CLOSED').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-blue-600">
                {purchases.filter((p) => p.status === 'COMPLETED').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">
              Không tìm thấy chiến dịch mua chung nào
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setCreateOpen(true)}
            >
              Tạo chiến dịch đầu tiên
            </Button>
          </div>
        ) : (
          filtered.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate mb-1">
                    {purchase.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {purchase.productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {purchase.cooperativeName}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${statusConfig[purchase.status].color}`}
                >
                  {statusConfig[purchase.status].label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div>
                  <p className="text-gray-600">Số lượng</p>
                  <p className="font-semibold text-sm">
                    {purchase.totalCommittedQty}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Đơn giá</p>
                  <p className="font-semibold text-sm">
                    {(purchase.currentUnitPrice / 1000).toFixed(0)}k
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Người tham gia</p>
                  <p className="font-semibold text-sm">
                    {purchase.participationCount}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Hạn chót</p>
                  <p className="font-semibold text-sm">
                    {new Date(purchase.deadlineDate).toLocaleDateString(
                      'vi-VN'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs gap-1 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                  onClick={() => {
                    setSelectedPurchase(purchase);
                    setDetailOpen(true);
                  }}
                >
                  <Eye className="w-3 h-3" /> Xem chi tiết
                </Button>
                {purchase.status === 'GATHERING' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs gap-1 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 transition-colors"
                    onClick={async () => {
                      const success = await closeCampaign(purchase.id);
                      if (success) {
                        toast.success('Đã đóng chiến dịch');
                        loadCampaigns();
                      }
                    }}
                  >
                    <Calendar className="w-3 h-3" /> Đóng
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <CreatePurchaseDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCampaignCreated={loadCampaigns}
      />
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
