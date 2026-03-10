import httpClient from '../../../services/http/httpClient';
import { API_ENDPOINTS } from '../../../constants/apiEndpoints';

export const chatApi = {
  createRoom(bulkSaleId: string) {
    return httpClient.post(API_ENDPOINTS.CHAT.ROOMS, { bulkSaleId });
  },

  getMyRooms() {
    return httpClient.get(API_ENDPOINTS.CHAT.ROOMS);
  },

  getMessages(roomId: string, page = 0, size = 20) {
    return httpClient.get(
      `${API_ENDPOINTS.CHAT.MESSAGES(roomId)}?page=${page}&size=${size}`
    );
  },

  sendMessage(
    roomId: string,
    content: string,
    senderType: 'ENTERPRISE' | 'COOPERATIVE'
  ) {
    return httpClient.post(API_ENDPOINTS.CHAT.MESSAGES(roomId), {
      content,
      senderType,
    });
  },
};
