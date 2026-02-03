import { useEffect, useState } from 'react';
import RegisterForm from '../components/login/RegisterForm';
import { locationApi } from '../services/location/locationApi';
import { authApi } from '../services/auth/authApi';
import { validateRegister } from '../utils/validators/authValidator';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [province, setProvince] = useState('');
  const [commune, setCommune] = useState('');
  const [produce, setProduce] = useState('');

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

  const handleCommuneChange = (name) => {
    setCommune(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateRegister({
      name,
      username,
      phoneNumber,
      password,
      confirmPassword,
      province,
      commune,
      produce,
    });

    if (error) return toast.error(error);

    try {
      setLoading(true);

      await authApi.registerCoop({
        name,
        username,
        phone_num: phoneNumber,
        password,
        province,
        commune,
        produce,
      });

      toast.success('Đăng ký thành công');
      setTimeout(() => (window.location.href = '/login'), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      name={name}
      username={username}
      phoneNumber={phoneNumber}
      password={password}
      confirmPassword={confirmPassword}
      province={province}
      commune={commune}
      produce={produce}
      provinces={provinces}
      communes={communes}
      showPassword={showPassword}
      loading={loading}
      onNameChange={(e) => setName(e.target.value)}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
      onProvinceChange={handleProvinceChange}
      onCommuneChange={handleCommuneChange}
      onProduceChange={(e) => setProduce(e.target.value)}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
