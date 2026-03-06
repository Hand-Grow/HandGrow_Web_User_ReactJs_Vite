import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';
import {
  JoinRequest,
  RespondJoinRequestPayload,
} from '../../types/joinRequest';

export const joinRequestService = {
  getMyRequests: async (
    status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'
  ): Promise<JoinRequest[]> => {
    const url =
      !status || status === 'ALL'
        ? API_ENDPOINTS.JOIN_REQUEST.ALL_REQUEST
        : API_ENDPOINTS.JOIN_REQUEST.BY_STATUS(
            status as 'PENDING' | 'APPROVED' | 'REJECTED'
          );

    const res = await httpClient.get<JoinRequest[]>(url);
    return res.data;
  },

  respond: async (
    requestId: string,
    payload: RespondJoinRequestPayload
  ): Promise<JoinRequest> => {
    const res = await httpClient.put<JoinRequest>(
      API_ENDPOINTS.JOIN_REQUEST.RESPOND(requestId),
      payload
    );
    return res.data;
  },
};
