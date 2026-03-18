'use client';

import {
  Search,
  Eye,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
} from 'lucide-react';

import { toast } from 'react-hot-toast';
import { useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { AuthContext } from '@/src/context/auth/auth.context';
import { joinRequestService } from '@/src/services/joinRequestService';
import MainLayout from '@/src/components/layout/MainLayout';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Member,
  MemberDetailModal,
} from '@/src/components/member-detail-modal';
import {
  JoinRequest,
  JoinRequestStatus,
  RespondJoinRequestPayload,
  statusConfig,
} from '@/src/types';
import { FormModal } from '@/src/components/form-modal';
import { useTranslation } from 'react-i18next';

type TabId = 'all' | 'active' | 'pending' | 'inactive';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
}
export default function MembersPage() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const mapApiToMember = useCallback(
    (item: JoinRequest): Member => ({
      id: item.id,
      name: item.farmerName,
      email: '',
      phone: item.farmerPhone,
      address: item.cooperativeName,
      status: item.status,
      joinDate: new Date(item.createdAt).toLocaleDateString('vi-VN'),
      loans: 0,
      totalDebt: 0,
      landArea: 0,
      cropType: 'N/A',
    }),
    []
  );

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);

      let apiStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | undefined;

      if (activeTab === 'pending') apiStatus = 'PENDING';
      else if (activeTab === 'active') apiStatus = 'APPROVED';
      else if (activeTab === 'inactive') apiStatus = 'REJECTED';
      else apiStatus = undefined;

      const res = await joinRequestService.getMyRequests(apiStatus);
      setMembers(res.map(mapApiToMember));
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(t('MEMBERS.TOAST.LOAD_ERROR'));
    } finally {
      setLoading(false);
    }
  }, [activeTab, mapApiToMember]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRespond = async (requestId: string, isApproved: boolean) => {
    const actionText = isApproved ? 'duyệt' : 'từ chối';
    try {
      setLoading(true);

      const payload: RespondJoinRequestPayload = {
        approved: isApproved,
        responseMessage: isApproved
          ? t('MEMBERS.TOAST.APPROVE_SUCCESS')
          : t('MEMBERS.TOAST.REJECT_SUCCESS'),
      };

      await joinRequestService.respond(requestId, payload);
      toast.success(`Đã ${actionText} thành viên thành công!`);

      await fetchMembers();
    } catch (error) {
      console.error('API Error:', error);
      toast.error(`Lỗi khi ${actionText} thành viên`);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );

  const stats = {
    total: members.length,
    active: members.filter(
      (m) => (m.status as JoinRequestStatus) === JoinRequestStatus.APPROVED
    ).length,
    pending: members.filter(
      (m) => (m.status as JoinRequestStatus) === JoinRequestStatus.PENDING
    ).length,
    rejected: members.filter(
      (m) => (m.status as JoinRequestStatus) === JoinRequestStatus.REJECTED
    ).length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('MEMBERS.TITLE')}
          </h1>
          <p className="text-gray-600 mt-1">
            Hợp tác xã: {user?.fullName || 'Cửa hàng HTX'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label={t('MEMBERS.STATUS.TOTAL')}
            value={stats.total}
            icon={<Users />}
            color="bg-blue-100 text-blue-700"
          />
          <StatCard
            label={t('MEMBERS.STATUS.ACTIVE')}
            value={stats.active}
            icon={<CheckCircle />}
            color="bg-emerald-100 text-emerald-700"
          />
          <StatCard
            label={t('MEMBERS.STATUS.PENDING')}
            value={stats.pending}
            icon={<Clock />}
            color="bg-orange-100 text-orange-700"
          />
          <StatCard
            label={t('MEMBERS.STATUS.REJECTED')}
            value={stats.rejected}
            icon={<XCircle />}
            color="bg-red-100 text-red-700"
          />
        </div>

        <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Tìm tên hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-5 h-5 mr-2" /> {t('MEMBERS.ACTION.ADD')}
            </Button>
          </div>

          <div className="flex gap-4 mb-6 border-b">
            {(['all', 'active', 'pending', 'inactive'] as TabId[]).map((id) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 font-medium border-b-2 transition ${
                  activeTab === id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {id === 'all'
                  ? t('MEMBERS.FILTER.ALL')
                  : id === 'active'
                    ? t('MEMBERS.FILTER.ACTIVE')
                    : id === 'pending'
                      ? t('MEMBERS.FILTER.PENDING')
                      : t('MEMBERS.FILTER.REJECTED')}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50 text-sm">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-emerald-800 uppercase">
                    {t('MEMBERS.TABLE.NAME')}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-emerald-800 uppercase">
                    {t('MEMBERS.TABLE.PHONE')}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-emerald-800 uppercase">
                    {t('MEMBERS.TABLE.LOCATION')}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-emerald-800 uppercase">
                    {t('MEMBERS.TABLE.STATUS')}
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-emerald-800 uppercase">
                    {t('MEMBERS.TABLE.ACTION')}
                  </th>
                </tr>
              </thead>
              <tbody className={loading ? 'opacity-50' : ''}>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-emerald-50 hover:bg-emerald-50/40 transition-all duration-200"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                          {member.name ? member.name[0] : '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.joinDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {member.phone}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {member.address}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${statusConfig[member.status as JoinRequestStatus].color}`}
                      >
                        {statusConfig[member.status as JoinRequestStatus].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        {member.status === JoinRequestStatus.PENDING && (
                          <div className="flex gap-2 mr-2 border-r pr-2">
                            <Button
                              size="sm"
                              onClick={() => handleRespond(member.id, true)}
                              className="text-emerald-600 hover:bg-emerald-100 rounded-md"
                              disabled={loading}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                if (window.confirm('Từ chối thành viên này?'))
                                  handleRespond(member.id, false);
                              }}
                              className="text-red-600 hover:bg-red-100 rounded-md"
                              disabled={loading}
                            >
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </div>
                        )}
                        <Button
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                          className="text-emerald-600 hover:bg-emerald-100"
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredMembers.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-500 italic">
                {t('MEMBERS.EMPTY')}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <FormModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        title={t('MEMBERS.ADD_MODAL_TITLE')}
        submitLabel={
          loading ? t('MEMBERS.SUBMIT_LOADING') : t('MEMBERS.SUBMIT')
        }
        onSubmit={async () => {
          if (!formData.name || !formData.phone)
            return toast.error(t('MEMBERS.ADD_VALIDATION_ERROR'));
          try {
            setLoading(true);
            toast.success(t('MEMBERS.ADD_SUCCESS'));
            setShowAddModal(false);
            setFormData({ name: '', email: '', phone: '', address: '' });
            fetchMembers();
          } catch (error) {
            console.error(error);
            toast.error(t('MEMBERS.ADD_ERROR'));
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="space-y-4 pt-2">
          <Input
            placeholder={t('MEMBERS.FORM.NAME')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder={t('MEMBERS.FORM.PHONE')}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <Input
            placeholder={t('MEMBERS.FORM.ADDRESS')}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
      </FormModal>
    </MainLayout>
  );
}

// Sub-component tách biệt để quản lý Props Type chặt chẽ
function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div
      className={`${color} rounded-lg p-4 text-center shadow-sm border border-black/5`}
    >
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
