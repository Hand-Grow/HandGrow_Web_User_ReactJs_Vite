import { Search } from 'lucide-react';

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <button
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition
      ${
        active
          ? 'bg-emerald-600 text-white'
          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
      }
    `}
  >
    {label}
  </button>
);

export default function FilterBar() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-5">
      {/* search */}
      <div className="flex items-center border rounded-xl px-4 py-3 bg-white">
        <Search size={18} className="text-neutral-400" />
        <input
          placeholder="Tìm kiếm nông sản, HTX..."
          className="ml-3 outline-none w-full text-sm"
        />
      </div>

      <div className="space-y-4 text-sm">
        {/* Loại */}
        <div>
          <p className="text-neutral-500 mb-2">Loại nông sản</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Tất cả" active />
            <Chip label="Lúa gạo" />
            <Chip label="Rau củ" />
            <Chip label="Trái cây" />
            <Chip label="Cà phê" />
          </div>
        </div>

        {/* Vùng */}
        <div>
          <p className="text-neutral-500 mb-2">Vùng miền</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Tất cả vùng miền" active />
            <Chip label="Miền Bắc" />
            <Chip label="Miền Trung" />
            <Chip label="Miền Nam" />
            <Chip label="ĐBSCL" />
          </div>
        </div>

        {/* Chứng chỉ */}
        <div>
          <p className="text-neutral-500 mb-2">Chứng chỉ</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Tất cả chứng chỉ" active />
            <Chip label="VietGAP" />
            <Chip label="Organic" />
            <Chip label="GlobalGAP" />
            <Chip label="HACCP" />
          </div>
        </div>
      </div>
    </div>
  );
}
