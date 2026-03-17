'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { Province, Ward } from '@/src/types/location';
import { validateRegister } from '@/src/utils/validators/authValidator';
import RegisterForm from '@/src/components/layout/register/RegisterForm';
import { locationApi } from '@/src/services/location/locationApi';
import { authApi } from '@/src/services/auth/authApi';
import { API_ENDPOINTS } from '@/src/constants';
import i18next from 'i18next';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();
  const [provinceCode, setProvinceCode] = useState<number | null>(null);
  const [provinceName, setProvinceName] = useState<string>('');
  const [produce, setProduce] = useState<string>('');
  const [communeCode, setCommuneCode] = useState<string>('');
  const [communeName, setCommuneName] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communces, setCommunces] = useState<Ward[]>([]); // Sửa tên cho đúng

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.LOCATION.PROVINCES);
        const data = await res.json();
        setProvinces(data);
      } catch (error) {
        toast.error('Không thể tải danh sách tỉnh/thành phố');
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (code: number) => {
    try {
      const selectedProvince = provinces.find((p) => p.code === code);
      if (!selectedProvince) return;

      setProvinceCode(code);
      setProvinceName(selectedProvince.name);
      setCommuneCode('');
      setCommuneName('');
      setCommunces([]);

      const res = await locationApi.getProvinceDetail(code);
      setCommunces(res.data.wards || []);
    } catch (error) {
      toast.error('Không thể tải danh sách quận/huyện');
    }
  };

  const handleCommuneChange = (code: string) => {
    const ward = communces.find((w) => w.code.toString() === code);
    if (!ward) return;

    setCommuneCode(code);
    setCommuneName(ward.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateRegister({
      name,
      username,
      phoneNumber,
      password,
      confirmPassword,
      province: provinceName,
      commune: communeName,
      produce,
    });

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        username,
        phoneNumber,
        password,
        province: provinceName,
        commune: communeName,
        produce,
      };
      await authApi.registerCoop(payload);
      toast.success('Đăng ký thành công');
      setTimeout(() => {
        router.push(`/login?lang=${i18next.language || 'vi'}`);
      }, 800);
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
      commune={communeCode}
      produce={produce}
      provinces={provinces}
      communes={communces} // Sửa tên prop cho đúng
      showPassword={showPassword}
      loading={loading}
      onNameChange={setName}
      onUsernameChange={setUsername}
      onPhoneNumberChange={setPhoneNumber}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onProvinceChange={(value: string) => handleProvinceChange(Number(value))}
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
