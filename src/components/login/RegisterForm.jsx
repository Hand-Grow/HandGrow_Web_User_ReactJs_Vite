import InputField from '../common/InputField';
import PrimaryButton from '../common/PrimaryButton';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
// import HandGrow from '../../assets/image/HandGrow.png';

const RegisterForm = ({
  name,
  email,
  address,
  password,
  confirmPassword,
  showPassword,
  loading,
  onNameChange,
  onEmailChange,
  onAddressChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full">
      <div className="mb-4 text-center">
        {/* <div className="flex items-center justify-center mb-3">
          <img
            src={HandGrow}
            alt="Hand Grow Together"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div> */}
      </div>

      <div className="max-w-sm w-full">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký</h2>
          <p className="text-gray-600 text-sm">Tạo tài khoản mới để bắt đầu</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <InputField
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            value={name}
            onChange={onNameChange}
            leftIcon={<User className="w-4 h-4" />}
          />

          <InputField
            label="Email"
            placeholder="Nhập email"
            value={email}
            onChange={onEmailChange}
            leftIcon={<User className="w-4 h-4" />}
          />

          <InputField
            label="Địa chỉ"
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChange={onAddressChange}
            leftIcon={<User className="w-4 h-4" />}
          />

          <InputField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={onPasswordChange}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            onClick={onTogglePassword}
          />

          <InputField
            label="Xác nhận mật khẩu"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
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
  );
};

export default RegisterForm;
