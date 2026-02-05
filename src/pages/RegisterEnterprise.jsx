import { useEffect, useState } from 'react';
import { locationApi } from '../services/location/locationApi';
import { authApi } from '../services/auth/authApi';
import { toast } from 'react-toastify';
import CompanyRegisterForm from '../components/layout/register/CompanyRegisterForm';

const RegisterEnterprise = () => {
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [province, setProvince] = useState('');
  const [commune, setCommune] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    locationApi.getProvinces().then((res) => setProvinces(res.data));
  }, []);

  const handleProvinceChange = async (name) => {
    setProvince(name);
    setCommune('');
    setCommunes([]);

    const selected = provinces.find((p) => p.name === name);
    if (!selected) return;

    const res = await locationApi.getProvinceDetail(selected.code);
    setCommunes(res.data.wards || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !username || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        companyName,
        username,
        phone_num: phoneNumber,
        password,
        province,
        commune,
      };

      await authApi.registerEnterprise(payload);

      toast.success('Đăng ký thành công');

      setTimeout(() => {
        window.location.href = '/login';
      }, 700);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyRegisterForm
      companyName={companyName}
      username={username}
      phoneNumber={phoneNumber}
      password={password}
      confirmPassword={confirmPassword}
      province={province}
      commune={commune}
      provinces={provinces}
      communes={communes}
      showPassword={showPassword}
      loading={loading}
      onCompanyNameChange={setCompanyName}
      onUsernameChange={setUsername}
      onPhoneNumberChange={setPhoneNumber}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onProvinceChange={handleProvinceChange}
      onCommuneChange={setCommune}
      onTogglePassword={() => setShowPassword((p) => !p)}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterEnterprise;
