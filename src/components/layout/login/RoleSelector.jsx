import { Building2, Tractor, ChevronRight } from 'lucide-react';
import HandGrow from '../../../assets/image/HandGrow.png';

const RoleSelectView = ({ onSelectRole }) => {
  const handleSelectRole = (role) => {
    onSelectRole(role);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-3">
          <img
            src={HandGrow}
            alt="Hand Grow Together"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="max-w-sm w-full">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Bạn là ai...?
          </h3>
          <p className="text-gray-600 text-sm mb-8">Hãy chọn vai trò của bạn</p>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => handleSelectRole('cooperative')}
            className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center transition">
              <Tractor className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Hợp tác xã</h4>
              <p className="text-sm text-gray-500">Đối tác kinh doanh</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition" />
          </div>
          <div
            onClick={() => handleSelectRole('company')}
            className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center transition">
              <Building2 className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Doanh nghiệp</h4>
              <p className="text-sm text-gray-500">Đối tác doanh số</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectView;
