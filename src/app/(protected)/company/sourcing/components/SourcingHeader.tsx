export default function SourcingHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Tìm kiếm nguồn cung</h1>
        <p className="text-sm text-neutral-500">
          Khám phá các nguồn nông sản chất lượng
        </p>
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        + Tạo yêu cầu mua
      </button>
    </div>
  );
}
