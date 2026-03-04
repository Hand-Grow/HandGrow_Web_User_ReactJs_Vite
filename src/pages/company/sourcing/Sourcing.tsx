import SourcingHeader from './components/SourcingHeader';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';

export default function SourcingPage() {
  return (
    <div className="flex flex-col gap-8">
      <SourcingHeader />

      <FilterBar />

      {/* result header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">Tìm thấy 6 sản phẩm</p>

        <select className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm">
          <option>Liên quan nhất</option>
          <option>Giá thấp → cao</option>
          <option>Giá cao → thấp</option>
        </select>
      </div>

      <ProductGrid />
    </div>
  );
}
