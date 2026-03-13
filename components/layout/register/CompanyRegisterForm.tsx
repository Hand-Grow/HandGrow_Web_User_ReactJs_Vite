import InputField from '../../common/InputField';
import PrimaryButton from '../../common/PrimaryButton';
import React from 'react';
import { Lock, Eye, EyeOff, Building2, Mail, Phone } from 'lucide-react';
import { Province, Ward } from '@/src/types';

interface CompanyRegisterFormProps {
  companyName: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;

  province: string;
  commune: string;

  provinces: Province[];
  communes: Ward[];

  showPassword: boolean;
  loading: boolean;

  onCompanyNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onCommuneChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CompanyRegisterForm: React.FC<CompanyRegisterFormProps> = ({
  companyName,
  username,
  phoneNumber,
  password,
  confirmPassword,
  province,
  commune,
  provinces,
  communes,
  showPassword,
  loading,
  onCompanyNameChange,
  onUsernameChange,
  onPhoneNumberChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onProvinceChange,
  onCommuneChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <div className="h-screen flex justify-center bg-white w-full">
      {' '}
      <div className="w-full max-w-sm flex flex-col">
        {' '}
        <div className="shrink-0 pt-10 pb-4 text-center px-4">
          {' '}
          <h2 className="text-2xl font-bold text-gray-900">Đăng ký</h2>{' '}
          <p className="text-gray-600 text-sm">
            Tạo tài khoản doanh nghiệp
          </p>{' '}
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 pb-10"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
          </style>

          <form onSubmit={onSubmit} className="space-y-3">
            <InputField
              label="Tên doanh nghiệp"
              placeholder="Nhập tên doanh nghiệp"
              value={companyName}
              onChangeValue={onCompanyNameChange}
              leftIcon={<Building2 className="w-4 h-4" />}
            />

            <InputField
              label="Email"
              placeholder="Nhập email"
              value={username}
              onChangeValue={onUsernameChange}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <InputField
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChangeValue={onPhoneNumberChange}
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <div>
              <label className="text-sm font-medium">Tỉnh / Thành phố</label>
              <select
                value={province}
                onChange={(e) => onProvinceChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                focus:outline-none"
              >
                <option value="">-- Chọn tỉnh --</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Xã / Phường</label>
              <select
                value={commune}
                onChange={(e) => onCommuneChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                focus:outline-none"
              >
                <option value="">-- Chọn xã / phường --</option>
                {communes.map((w) => (
                  <option key={w.code} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={password}
              onChangeValue={onPasswordChange}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )
              }
              onRightIconClick={onTogglePassword}
            />

            <InputField
              label="Xác nhận mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeValue={onConfirmPasswordChange}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <PrimaryButton type="submit" loading={loading}>
              Đăng ký
            </PrimaryButton>

            <p className="text-center text-sm text-gray-600 mt-4">
              Đã có tài khoản?{' '}
              <a
                href="/login"
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Đăng nhập
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
