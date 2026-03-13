import httpClient from '../http/httpClient';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

export const messageApi = {
  getConversations() {
    return httpClient.get(API_ENDPOINTS.MESSAGE.CONVERSATIONS);
  },

  getMessages(conversationId) {
    return httpClient.get(
      API_ENDPOINTS.MESSAGE.CONVERSATION_MESSAGES(conversationId)
    );
  },

  sendMessage(conversationId, content) {
    return httpClient.post(API_ENDPOINTS.MESSAGE.SEND_MESSAGE(conversationId), {
      content,
    });
  },

  markAsRead(conversationId) {
    return httpClient.post(API_ENDPOINTS.MESSAGE.MARK_AS_READ(conversationId));
  },

  getConversationDetail(conversationId) {
    return httpClient.get(
      API_ENDPOINTS.MESSAGE.CONVERSATION_DETAIL(conversationId)
    );
  },

  searchConversations(query) {
    return httpClient.get(
      `${API_ENDPOINTS.MESSAGE.SEARCH_CONVERSATIONS}?q=${query}`
    );
  },
};
