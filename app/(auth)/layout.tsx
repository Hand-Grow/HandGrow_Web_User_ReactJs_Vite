import { ReactNode } from 'react';
import clsx from 'clsx';
import AuthBanner from '@/src/components/layout/login/AuthBanner';

interface AuthLayoutProps {
  children: ReactNode;
  bannerPosition?: 'left' | 'right';
}

const AuthLayout = ({ children, bannerPosition = 'left' }: AuthLayoutProps) => {
  const bannerRadius =
    bannerPosition === 'left'
      ? 'rounded-tr-[50px] rounded-br-[50px]'
      : 'rounded-tl-[50px] rounded-bl-[50px]';

  const Banner = (
    <div
      className={clsx(
        'hidden lg:flex w-1/2 bg-[#3CC18E] flex-col items-center justify-center p-8 relative',
        bannerRadius
      )}
    >
      <AuthBanner />
    </div>
  );

  const Content = (
    <div className="w-full lg:w-1/2 flex items-center justify-center">
      {children}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {bannerPosition === 'right' ? (
        <>
          {Content}
          {Banner}
        </>
      ) : (
        <>
          {Banner}
          {Content}
        </>
      )}
    </div>
  );
};

export default AuthLayout;
