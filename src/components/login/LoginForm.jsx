import InputField from '../common/InputField';
import PrimaryButton from '../common/PrimaryButton';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
import HandGrow from '../../assets/image/HandGrow.png';

const LoginForm = ({
  email,
  password,
  showPassword,
  loading,
  rememberMe,
  onRememberMeChange,
  rememberRef,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-white">
      <div className="mb-4 text-center">
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
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
          <p className="text-gray-600 text-sm">
            Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <InputField
            label="Email hoặc số điện thoại"
            placeholder="Nhập email hoặc số điện thoại"
            value={email}
            onChange={onEmailChange}
            leftIcon={<User className="w-4 h-4" />}
          />

          <InputField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={onPasswordChange}
            leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
            rightIcon={
              showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            onRightIconClick={onTogglePassword}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                ref={rememberRef}
                type="checkbox"
                checked={rememberMe}
                onChange={onRememberMeChange}
                className="accent-teal-500"
              />
              <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
            </label>
            <div className="text-sm text-teal-500 font-medium">
              Quên mật khẩu?
            </div>
          </div>

          <PrimaryButton type="submit" loading={loading}>
            Đăng nhập
          </PrimaryButton>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">Hoặc tiếp tục với</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full h-10 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-lg transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Đăng nhập bằng Google</span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{' '}
            <a
              href="./register"
              className="text-teal-500 hover:text-teal-600 font-medium"
            >
              Đăng ký ngay
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
