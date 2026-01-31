import { toast } from 'react-toastify';

export const handleApiError = (err) => {
  const status = err?.response?.status;

  switch (status) {
    case 400:
      toast.error('Dữ liệu không hợp lệ');
      break;

    case 401:
      toast.error('Email hoặc mật khẩu không đúng');
      break;

    case 403:
      toast.error('Bạn không có quyền thực hiện thao tác này');
      break;

    case 404:
      toast.error('Không tìm thấy dữ liệu');
      break;

    case 409:
      toast.error('Dữ liệu đã tồn tại');
      break;

    case 422:
      toast.error('Thông tin nhập chưa đúng');
      break;

    case 500:
    default:
      toast.error('Hệ thống đang bận, vui lòng thử lại sau');
  }
};
