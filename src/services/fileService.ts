import { API_ENDPOINTS } from '@/src/constants/apiEndpoints';
import httpClient from './http/httpClient';
import axios from 'axios';
import { PresignedUrlResponse } from '@/src/types';

export const fileService = {
  getPresignedUrl: async (
    filename: string,
    contentType: string
  ): Promise<PresignedUrlResponse> => {
    const res = await httpClient.get<PresignedUrlResponse>(
      API_ENDPOINTS.FILES.PRESIGNED_URL(filename, contentType)
    );
    return res.data;
  },

  uploadToS3: async (presignedUrl: string, file: File): Promise<void> => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },

  uploadFile: async (file: File): Promise<string> => {
    const { presignedUrl, publicUrl } = await fileService.getPresignedUrl(
      file.name,
      file.type
    );
    await fileService.uploadToS3(presignedUrl, file);
    return publicUrl;
  },
};
