import {
  ApiResponse,
  CommitmentRequest,
  CommitmentResponse,
  CreateAnnouncementRequest,
  CreateCampaignRequest,
  FeedResponse,
  Post,
} from '@/src/types';
import httpClient from './http/httpClient';
import { API_ENDPOINTS } from '@/src/constants/apiEndpoints';
import { PageResponse, CommentResponse } from '@/src/types';

export const feedService = {
  getFeed: async (
    coopId: string,
    page = 0,
    size = 10
  ): Promise<PageResponse<Post>> => {
    const res = await httpClient.get<PageResponse<Post>>(
      `${API_ENDPOINTS.FEED.GET_FEED(coopId)}?page=${page}&size=${size}`
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
  ): Promise<boolean> => {
    const res = await httpClient.post<ApiResponse<null>>(
      API_ENDPOINTS.ANNOUNCEMENT.CREATE(coopId),
      data
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return true;
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
  ): Promise<boolean> => {
    const res = await httpClient.post<ApiResponse<null>>(
      API_ENDPOINTS.CAMPAIGN.CREATE(coopId),
      data
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return true;
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
    expectedPrice: number,
    attachments: string[] = []
  ): Promise<void> => {
    await httpClient.post(API_ENDPOINTS.CAMPAIGN.PUBLISH_TO_B2B(campaignId), {
      expectedPrice,
      attachments,
    });
  },
  async getMarketplacePosts(page = 0) {
    const res = await httpClient.get(API_ENDPOINTS.MARKETPLACE.LIST(page));

    return res.data || [];
  },
};
