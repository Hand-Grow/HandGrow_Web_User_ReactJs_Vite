'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { Province, Ward } from '@/types/location';
import { validateRegister } from '@/utils/validators/authValidator';
import RegisterForm from '@/components/layout/register/RegisterForm';
import { locationApi } from '@/services/location/locationApi';
import { authApi } from '@/services/auth/authApi';
import { API_ENDPOINTS } from '@/constants';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [provinceCode, setProvinceCode] = useState<number | null>(null);
  const [provinceName, setProvinceName] = useState<string>('');
  const [produce, setProduce] = useState<string>('');
  const [communeCode, setCommuneCode] = useState<string>('');
  const [communeName, setCommuneName] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Ward[]>([]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(API_ENDPOINTS.LOCATION.PROVINCES)
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      });
  }, []);

  const handleProvinceChange = async (code: number) => {
    const selectedProvince = provinces.find((p) => p.code === code);
    if (!selectedProvince) return;

    setProvinceCode(code);
    setProvinceName(selectedProvince.name);
    setCommuneCode('');
    setCommuneName('');
    setCommunes([]);

    const res = await locationApi.getProvinceDetail(code);
    setCommunes(res.data.wards || []);
  };

  const handleCommuneChange = (code: string) => {
    const ward = communes.find((w) => w.code.toString() === code);
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

    if (error) return toast.error(error);

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
      commune={communeCode}
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
