import ProductCard from './ProductCard';

export default function ProductGrid() {
  const mock = Array(6).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mock.map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
