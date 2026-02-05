import { Outlet } from 'react-router-dom';
import AuthBanner from '../login/AuthBanner';
import clsx from 'clsx';

const AuthLayout = ({ bannerPosition = 'left' }) => {
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
      <Outlet />
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
