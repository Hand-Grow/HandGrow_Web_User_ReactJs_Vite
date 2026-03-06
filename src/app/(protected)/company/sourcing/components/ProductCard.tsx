import { MapPin, Star } from 'lucide-react';

export default function ProductCard() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      {/* image */}
      <div className="relative">
        <img
          src="https://picsum.photos/600/400"
          className="h-44 w-full object-cover"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
            VietGAP
          </span>
          <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
            Organic
          </span>
        </div>
      </div>

      {/* body */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base">Lúa ST25</h3>

        <p className="text-sm text-neutral-500">HTX Nông nghiệp An Phước</p>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            An Giang
          </span>

          <span className="flex items-center gap-1 text-orange-500">
            <Star size={14} fill="currentColor" />
            4.8
          </span>
        </div>

        <div className="text-orange-600 font-bold text-lg">9,000 đ/kg</div>

        <p className="text-xs text-neutral-500">
          Tối thiểu: 10 tấn • Có sẵn: 450 tấn
        </p>

        <div className="flex gap-3 mt-3">
          <button className="flex-1 bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition">
            Liên hệ HTX
          </button>

          <button className="w-11 h-11 border rounded-xl flex items-center justify-center hover:bg-neutral-100 transition">
            <Star size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
