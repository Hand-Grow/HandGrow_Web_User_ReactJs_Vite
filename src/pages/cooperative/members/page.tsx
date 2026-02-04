'use client';

import { useState } from 'react';
import { MainLayout } from '../main-layout';
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
} from 'lucide-react';

import { toast } from 'react-hot-toast';
import { MemberDetailModal } from '../components/member-detail-modal';
import { FormModal } from '../components/form-modal';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

type MemberStatus = 'active' | 'pending' | 'inactive';
type TabId = 'all' | MemberStatus;

interface Tab {
  id: TabId;
  label: string;
  count: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: MemberStatus;
  joinDate: string;
  loans: number;
  totalDebt: number;
  landArea: number;
  cropType: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    address: 'An Phước, Tây Phú',
    status: 'active',
    joinDate: '15/01/2024',
    loans: 12,
    totalDebt: 25500000,
    landArea: 2.5,
    cropType: 'Lúa',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    phone: '0901256789',
    address: 'An Phước, Tây Phú',
    status: 'active',
    joinDate: '20/01/2024',
    loans: 8,
    totalDebt: 15300000,
    landArea: 1.8,
    cropType: 'Cà phê',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0902234561',
    address: 'An Phước, Tây Phú',
    status: 'pending',
    joinDate: '25/01/2024',
    loans: 0,
    totalDebt: 0,
    landArea: 3.2,
    cropType: 'Lúa',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0903334561',
    address: 'An Phước, Tây Phú',
    status: 'active',
    joinDate: '28/01/2024',
    loans: 5,
    totalDebt: 8900000,
    landArea: 1.2,
    cropType: 'Lúa',
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0904445618',
    address: 'An Phước, Tây Phú',
    status: 'inactive',
    joinDate: '10/01/2024',
    loans: 15,
    totalDebt: 32100000,
    landArea: 2.8,
    cropType: 'Lúa',
  },
];

const statusConfig = {
  active: { label: 'Hoạt động', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Chờ duyệt', color: 'bg-orange-100 text-orange-700' },
  inactive: { label: 'Ngừng hoạt động', color: 'bg-red-100 text-red-700' },
};

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState<MemberStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const filteredMembers = mockMembers.filter((member) => {
    const matchesTab = activeTab === 'all' || member.status === activeTab;
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const stats = {
    total: mockMembers.length,
    active: mockMembers.filter((m) => m.status === 'active').length,
    pending: mockMembers.filter((m) => m.status === 'pending').length,
  };

  const tabs: Tab[] = [
    { id: 'all', label: 'Tất cả', count: stats.total },
    { id: 'active', label: 'Hoạt động', count: stats.active },
    { id: 'pending', label: 'Chờ duyệt', count: stats.pending },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý thành viên
          </h1>
          <p className="text-gray-600 mt-1">Quản lý và duyệt thành viên HTX</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: 'Tổng thành viên',
              value: stats.total,
              icon: <Users className="w-6 h-6" />,
              color: 'bg-emerald-100 text-emerald-700',
            },
            {
              label: 'Hoạt động',
              value: stats.active,
              icon: <CheckCircle className="w-6 h-6" />,
              color: 'bg-emerald-100 text-emerald-700',
            },
            {
              label: 'Chờ duyệt',
              value: stats.pending,
              icon: <Clock className="w-6 h-6" />,
              color: 'bg-orange-100 text-orange-700',
            },
            {
              label: 'Ngừng hoạt động',
              value: mockMembers.filter((m) => m.status === 'inactive').length,
              icon: <XCircle className="w-6 h-6" />,
              color: 'bg-red-100 text-red-700',
            },
            {
              label: 'Nợng hoạt động',
              value: 0,
              icon: <Users className="w-6 h-6" />,
              color: 'bg-gray-100 text-gray-700',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-lg p-4 text-center`}
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs font-semibold mt-1 opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Search & Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, email, hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm thành viên
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Thành viên
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Liên hệ
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Địa chỉ
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Trạng thái
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                          {member.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.joinDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-gray-700">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-700">{member.address}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[member.status].color}`}
                      >
                        {statusConfig[member.status].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5 text-emerald-600" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            toast.success(`Chỉnh sửa ${member.name}`)
                          }
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-5 h-5 text-blue-600" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => toast.error(`Xóa ${member.name}`)}
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Không tìm thấy thành viên</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Add Member Modal */}
      <FormModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        title="Thêm thành viên mới"
        description="Nhập thông tin của thành viên cần thêm vào HTX"
        submitLabel="Thêm thành viên"
        onSubmit={() => {
          if (formData.name && formData.email && formData.phone) {
            toast.success(`Đã thêm thành viên ${formData.name}`);
            setFormData({ name: '', email: '', phone: '', address: '' });
            setShowAddModal(false);
          } else {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
          }
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên thành viên *
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên thành viên"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
      </FormModal>
    </MainLayout>
  );
}
