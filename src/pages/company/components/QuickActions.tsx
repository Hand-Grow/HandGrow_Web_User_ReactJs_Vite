export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold mb-4">Thao tác nhanh</h3>

      <button className="w-full bg-primary text-white py-3 rounded-xl mb-3 hover:shadow-md transition">
        + Tạo yêu cầu mua mới
      </button>

      <button className="w-full bg-neutral-100 py-3 rounded-xl hover:bg-neutral-200 transition">
        Tìm kiếm nguồn cung
      </button>
    </div>
  );
}
