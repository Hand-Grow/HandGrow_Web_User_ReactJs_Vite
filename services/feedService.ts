import {
  CommitmentRequest,
  CommitmentResponse,
  CreateAnnouncementRequest,
  CreateCampaignRequest,
  FeedResponse,
  Post,
} from '@/src/types';
import httpClient from './http/httpClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  farmerName: string;
}

export const feedService = {
  getFeed: async (coopId: string): Promise<FeedResponse> => {
    const res = await httpClient.get<FeedResponse>(
      API_ENDPOINTS.FEED.GET_FEED(coopId)
    );

    return res.data;
  },

  toggleLike: async (
    type: 'announcement' | 'campaign',
    id: string
  ): Promise<void> => {
    await httpClient.post(API_ENDPOINTS.FEED.TOGGLE_LIKE(type, id));
  },

  getComments: async (
    type: 'announcement' | 'campaign',
    id: string,
    page = 0,
    size = 20
  ): Promise<CommentResponse[]> => {
    const res = await httpClient.get<CommentResponse[]>(
      API_ENDPOINTS.FEED.GET_COMMENTS(type, id, page, size)
    );
    return res.data;
  },

  postComment: async (
    type: 'announcement' | 'campaign',
    id: string,
    content: string
  ): Promise<CommentResponse> => {
    const res = await httpClient.post<CommentResponse>(
      API_ENDPOINTS.FEED.POST_COMMENT(type, id),
      { content }
    );
    return res.data;
  },

  createAnnouncement: async (
    coopId: string,
    data: CreateAnnouncementRequest
  ): Promise<Post> => {
    const res = await httpClient.post<Post>(
      API_ENDPOINTS.ANNOUNCEMENT.CREATE(coopId),
      data
    );
    return res.data;
  },

  getAnnouncements: async (
    coopId: string,
    page = 0,
    size = 10
  ): Promise<PageResponse<Post>> => {
    const res = await httpClient.get<PageResponse<Post>>(
      API_ENDPOINTS.ANNOUNCEMENT.LIST(coopId, page, size)
    );
    return res.data;
  },

  createCampaign: async (
    coopId: string,
    data: CreateCampaignRequest
  ): Promise<Post> => {
    const res = await httpClient.post<Post>(
      API_ENDPOINTS.CAMPAIGN.CREATE(coopId),
      data
    );
    return res.data;
  },

  commitCampaign: async (
    campaignId: number,
    data: CommitmentRequest
  ): Promise<CommitmentResponse> => {
    const res = await httpClient.post<CommitmentResponse>(
      API_ENDPOINTS.CAMPAIGN.COMMIT(campaignId),
      data
    );
    return res.data;
  },

  getCommitments: async (
    campaignId: number,
    page = 0,
    size = 20
  ): Promise<PageResponse<CommitmentResponse>> => {
    const res = await httpClient.get<PageResponse<CommitmentResponse>>(
      API_ENDPOINTS.CAMPAIGN.GET_COMMITMENTS(campaignId, page, size)
    );
    return res.data;
  },

  publishCampaign: async (
    campaignId: string,
    expectedPrice: number
  ): Promise<void> => {
    await httpClient.post(API_ENDPOINTS.CAMPAIGN.PUBLISH_TO_B2B(campaignId), {
      expectedPrice,
    });
  },
  async getMarketplacePosts(page = 0) {
    const res = await httpClient.get(API_ENDPOINTS.MARKETPLACE.LIST(page));

    return res.data || [];
  },
};
