import { useEffect, useState } from 'react';
import RegisterForm from '../components/layout/register/RegisterForm';
import React from 'react';
import { locationApi } from '../services/location/locationApi';
import { authApi } from '../services/auth/authApi';
import { validateRegister } from '../utils/validators/authValidator';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import type { Province, Ward } from '../types/location';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [provinceCode, setProvinceCode] = useState<number | null>(null);
  const [provinceName, setProvinceName] = useState<string>('');
  const [commune, setCommune] = useState<string>('');
  const [produce, setProduce] = useState<string>('');

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Ward[]>([]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/v2/p')
      .then((res) => res.json())
      .then((data) => {
        console.log('FETCH DATA:', data);
        setProvinces(data);
      });
  }, []);

  const handleProvinceChange = async (code: number) => {
    const selectedProvince = provinces.find((p) => p.code === code);
    if (!selectedProvince) return;

    setProvinceCode(code);
    setProvinceName(selectedProvince.name);
    setCommune('');
    setCommunes([]);

    const res = await locationApi.getProvinceDetail(code);
    setCommunes(res.data.wards || []);
  };

  const handleCommuneChange = (name: string) => {
    setCommune(name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const selectedRole = localStorage.getItem('selectedRole');

    // if (!selectedRole) {
    //   toast.error('Vui lòng chọn vai trò');
    //   return;
    // }

    const error = validateRegister({
      name,
      username,
      phoneNumber,
      password,
      confirmPassword,
      province: provinceName,
      commune,
      produce,
    });

    if (error) return toast.error(error);

    try {
      setLoading(true);

      const payload = {
        name,
        username,
        phoneNumber,
        password,
        province: provinceName,
        commune,
        produce,
      };
      console.log('REGISTER PAYLOAD:', payload);
      await authApi.registerCoop(payload);

      toast.success('Đăng ký thành công');
      setTimeout(() => (window.location.href = '/login'), 800);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
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
      province={provinceCode?.toString() ?? ''}
      commune={commune}
      produce={produce}
      provinces={provinces}
      communes={communes}
      showPassword={showPassword}
      loading={loading}
      onNameChange={setName}
      onUsernameChange={setUsername}
      onPhoneNumberChange={setPhoneNumber}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onProvinceChange={(name: string) => handleProvinceChange(Number(name))}
      onCommuneChange={handleCommuneChange}
      onProduceChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setProduce(e.target.value)
      }
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
