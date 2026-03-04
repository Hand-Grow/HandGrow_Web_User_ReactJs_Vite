const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(0\d{9}|\+84\d{9})$/;

const required = (value, label) => {
  if (!value || !value.toString().trim()) {
    return `${label} không được để trống`;
  }
  return null;
};

export const validateLogin = ({ email, password }) => {
  const value = email?.trim();

  const empty = required(value, 'Email hoặc số điện thoại');
  if (empty) return empty;

  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    return 'Email hoặc số điện thoại không hợp lệ';
  }

  const passEmpty = required(password, 'Mật khẩu');
  if (passEmpty) return passEmpty;

  if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';

  return null;
};

export const validateRegister = ({
  name,
  username,
  phoneNumber,
  password,
  confirmPassword,
  province,
  commune,
  produce,
}) => {
  let error =
    required(name, 'Họ và tên') ||
    required(username, 'Email') ||
    required(phoneNumber, 'Số điện thoại') ||
    required(province, 'Tỉnh / Thành phố') ||
    required(commune, 'Xã / Phường') ||
    required(produce, 'Ngành sản xuất') ||
    required(password, 'Mật khẩu') ||
    required(confirmPassword, 'Mật khẩu xác nhận');

  if (error) return error;

  if (!emailRegex.test(username)) return 'Email không hợp lệ';

  if (!phoneRegex.test(phoneNumber))
    return 'Số điện thoại không hợp lệ (0xxxxxxxxx hoặc +84xxxxxxxxx)';

  if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';

  if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp';

  return null;
};
