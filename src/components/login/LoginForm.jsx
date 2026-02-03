import InputField from '../common/InputField';
import PrimaryButton from '../common/PrimaryButton';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
import HandGrow from '../../assets/image/HandGrow.png';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center bg-white w-full">
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

      <div className="max-w-sm w-full px-4">
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

          <div className="relative w-full">
            <GoogleLogin
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
              }}
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{' '}
            <Link
              to="/register"
              className="text-teal-500 hover:text-teal-600 font-medium"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
