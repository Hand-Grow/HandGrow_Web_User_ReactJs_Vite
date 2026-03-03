import { useEffect, useState } from 'react';
import { locationApi } from '../services/location/locationApi';
import { authApi } from '../services/auth/authApi';
import { toast } from 'react-toastify';
import CompanyRegisterForm from '../components/layout/register/CompanyRegisterForm';
import type { Province, Ward, District } from '../types/location';
import React from 'react';
import type { AxiosError } from 'axios';

const RegisterEnterprise: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [province, setProvince] = useState<string>('');
  const [commune, setCommune] = useState<string>('');

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Ward[]>([]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await locationApi.getProvinces();
        setProvinces(res.data);
      } catch (error) {
        console.error('Fetch provinces failed:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (name: string) => {
    try {
      setProvince(name);
      setCommune('');
      setCommunes([]);

      const selected = provinces.find((p: Province) => p.name === name);

      if (!selected) return;

      const res = await locationApi.getProvinceDetail(selected.code);

      const districts: District[] = res.data.districts ?? [];

      const allWards: Ward[] = districts.flatMap(
        (district: District) => district.wards ?? []
      );

      setCommunes(allWards);
    } catch (error) {
      console.error('Fetch province detail failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        phoneNumber,
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
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
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
      onTogglePassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterEnterprise;
