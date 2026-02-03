const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(0\d{9}|\+84\d{9})$/;

export const validateLogin = ({ email, password }) => {
  const value = email.trim();

  if (!value) return 'Email hoặc số điện thoại không được để trống';

  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    return 'Email hoặc số điện thoại không hợp lệ';
  }

  if (!password.trim()) return 'Mật khẩu không được để trống';

  if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';

  return null;
};

export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  if (!name.trim()) return 'Họ và tên không được để trống';

  if (!email.trim()) return 'Email hoặc số điện thoại không được để trống';

  if (!password.trim()) return 'Mật khẩu không được để trống';

  if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';

  if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp';

  return null;
};
