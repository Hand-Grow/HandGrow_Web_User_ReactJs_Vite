import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';
import { Post } from '../types/posts';

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  authorName: string;
}

export const feedService = {
  getFeed: async (
    coopId: string,
    page = 0,
    size = 10
  ): Promise<PageResponse<Post>> => {
    const res = await httpClient.get<PageResponse<Post>>(
      API_ENDPOINTS.FEED.GET_FEED(coopId, page, size)
    );
    return res.data;
  },

  toggleLike: async (
    type: 'announcements' | 'campaigns',
    id: number
  ): Promise<void> => {
    await httpClient.post(API_ENDPOINTS.FEED.TOGGLE_LIKE(type, id));
  },

  getComments: async (
    type: 'announcements' | 'campaigns',
    id: number,
    page = 0,
    size = 20
  ): Promise<PageResponse<CommentResponse>> => {
    const res = await httpClient.get<PageResponse<CommentResponse>>(
      API_ENDPOINTS.FEED.GET_COMMENTS(type, id, page, size)
    );
    return res.data;
  },

  postComment: async (
    type: 'announcements' | 'campaigns',
    id: number,
    content: string
  ): Promise<CommentResponse> => {
    const res = await httpClient.post<CommentResponse>(
      API_ENDPOINTS.FEED.POST_COMMENT(type, id),
      { content }
    );
    return res.data;
  },
};
