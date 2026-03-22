import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';

export const fileService = {
  getPresignedUrl: async (filename: string, contentType: string) => {
    const res = await httpClient.get(
      API_ENDPOINTS.FILES.PRESIGNED_URL(filename, contentType)
    );
    return res.data; // { presignedUrl, publicUrl }
  },

  uploadFile: async (file: File): Promise<string> => {
    // 1. Lấy presigned URL từ backend
    const { presignedUrl, publicUrl } = await fileService.getPresignedUrl(
      file.name,
      file.type
    );

    // 2. Upload trực tiếp lên S3 bucket dùng fetch (không dùng httpClient vì không cần Auth header/BaseURL cho S3)
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to S3');
    }

    // 3. Trả về public URL để lưu vào database
    return publicUrl;
  },
};
