'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import type { AxiosError } from 'axios';
import { locationApi } from '@/src/services/location/locationApi';
import { toast } from 'react-toastify';
import { authApi } from '@/src/services/auth/authApi';
import CompanyRegisterForm from '@/src/components/layout/register/CompanyRegisterForm';
import i18next from 'i18next';
import { Province, Ward } from '@/src/types';
import { useRouter } from 'next/navigation';
import { validateEnterpriseRegister } from '@/src/utils/validators/authValidator';

const RegisterEnterprise: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();
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

      setCommunes(res.data.wards || []);
    } catch (error) {
      console.error('Fetch province detail failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateEnterpriseRegister({
      companyName,
      username,
      phoneNumber,
      password,
      confirmPassword,
      province,
      commune,
    });

    if (error) {
      toast.error(error);
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
