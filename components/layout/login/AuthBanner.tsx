import { ImageExample } from '@/assets';
import Image from 'next/image';

import React from 'react';
const AuthBanner: React.FC = () => {
  return (
    <div className="text-center text-white max-w-md">
      <div className="mb-8">
        <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-6 inline-block">
          <Image
            src={ImageExample}
            alt="Hand Grow Together"
            width={192}
            height={192}
            className="w-48 h-48 rounded-2xl object-cover"
          />
        </div>
      </div>

      <h1 className="text-5xl font-bold mb-3">Hand Grow Together</h1>
      <p className="text-lg text-teal-50">Cùng nhau phát triển và lớn mạnh</p>
    </div>
  );
};

export default AuthBanner;
