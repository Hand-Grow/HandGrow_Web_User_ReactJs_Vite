import InputField from '../../common/InputField';
import PrimaryButton from '../../common/PrimaryButton';
import React from 'react';
import { Lock, Eye, EyeOff, User, Mail, Phone } from 'lucide-react';
import { Province, Ward } from '../../../types/location';

interface RegisterFormProps {
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  province: string;
  commune: string;
  produce: string;
  provinces: Province[];
  communes: Ward[];
  showPassword: boolean;
  loading: boolean;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onProvinceChange: (name: string) => void;
  onCommuneChange: (name: string) => void;
  onProduceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  username,
  phoneNumber,
  password,
  confirmPassword,
  province,
  commune,
  produce,
  provinces,
  communes,
  showPassword,
  loading,
  onNameChange,
  onUsernameChange,
  onPhoneNumberChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onProvinceChange,
  onCommuneChange,
  onProduceChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <div className="h-screen flex justify-center bg-white w-full">
      <div className="w-full max-w-sm flex flex-col">
        <div className="shrink-0 pt-10 pb-4 text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900">Đăng ký</h2>
          <p className="text-gray-600 text-sm">Tạo tài khoản mới để bắt đầu</p>
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
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={name}
              onChangeValue={onNameChange}
              leftIcon={<User className="w-4 h-4" />}
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
                  <option key={p.code} value={p.code}>
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
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Ngành sản xuất</label>
              <select
                value={produce}
                onChange={onProduceChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                  focus:outline-none"
              >
                <option value="">-- Chọn --</option>
                <option value="RICE">Lúa gạo</option>
                <option value="CORN">Ngô</option>
                <option value="VEGETABLES">Rau củ</option>
                <option value="FRUITS">Trái cây</option>
                <option value="COFFEE">Cà phê</option>
                <option value="TEA">Chè</option>
                <option value="RUBBER">Cao su</option>
                <option value="SUGARCANE">Mía</option>
                <option value="CASSAVA">Sắn</option>
                <option value="PEPPER">Tiêu</option>
                <option value="COCONUT">Dừa</option>
                <option value="CASHEW">Điều</option>
                <option value="AQUACULTURE">Thủy sản</option>
                <option value="LIVESTOCK">Chăn nuôi</option>
                <option value="OTHER">Khác</option>
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

export default RegisterForm;
