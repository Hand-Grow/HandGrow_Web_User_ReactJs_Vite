import React from 'react';
import Image from 'next/image';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { HandGrow } from '@/public/assets';
import InputField from '../../common/InputField';
import PrimaryButton from '../../common/PrimaryButton';

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  rememberMe: boolean;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rememberRef: React.RefObject<HTMLInputElement>;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
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
  onGoRegister,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full">
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center mb-3">
          <Image
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
            onChangeValue={(value) => onEmailChange(value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <InputField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChangeValue={(value) => onPasswordChange(value)}
            leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
            rightIcon={
              showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
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
              onSuccess={(credentialResponse: CredentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              containerProps={{
                style: {
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                },
              }}
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onGoRegister}
              className="text-teal-500 hover:text-teal-600 font-medium"
            >
              Đăng ký ngay
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
