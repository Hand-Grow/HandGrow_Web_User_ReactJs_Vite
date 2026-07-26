import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';

export const fileService = {
  uploadFile: async (file: File): Promise<string> => {
    // Get file extension
    const extension = file.name.split('.').pop();
    const contentType = file.type || 'application/octet-stream';

    // 1. Get presigned URL from backend
    const presignRes = await httpClient.get(
      `/api/v1/files/presigned-url?extension=${extension}&contentType=${encodeURIComponent(contentType)}`
    );
    // Backend wraps response in ApiResponse (data.data)
    const { uploadUrl, fileKey } = presignRes.data.data;

    // 2. Upload file directly to S3 using fetch or axios
    // Must NOT use httpClient because we don't want to attach the Authorization header to S3
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: file,
    });

    // 3. Return the final public URL
    // We assume the bucket URL can be constructed. For AWS S3:
    // Extract bucket URL from uploadUrl (everything before the fileKey)
    const publicUrl = uploadUrl.split('?')[0];
    return publicUrl;
  },
};
