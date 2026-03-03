import { useEffect, useState } from 'react';
import { JoinRequest, RespondJoinRequestPayload } from '../types/joinRequest';
import { joinRequestService } from '../services/joinRequestService';

export const useJoinRequests = () => {
  const [data, setData] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await joinRequestService.getMyRequests();
      setData(res);
    } catch {
      setError('Không thể tải danh sách yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const respondRequest = async (
    requestId: string,
    payload: RespondJoinRequestPayload
  ) => {
    try {
      setLoading(true);
      await joinRequestService.respond(requestId, payload);
      await fetchRequests();
    } catch {
      setError('Không thể xử lý yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchRequests,
    respondRequest,
  };
};
