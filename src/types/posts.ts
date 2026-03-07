export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Author {
  id?: string | number;
  name: string;
  avatar?: string;
}
export interface AnnouncementPost extends BasePost {
  type: 'ANNOUNCEMENT';
  title: string;
}

// export interface CampaignPost extends BasePost {
//   type: 'CAMPAIGN';

//   productName: string;
//   expectedDate: string;

//   totalCommitted?: number;
// }

export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  farmerName: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface CreateCampaignRequest {
  productName: string;
  expectedDate: string;
}

export interface CommitmentRequest {
  plot_id: string;
  committed_quantity: number;
}

export interface CommitmentResponse {
  id: string;
  farmerName: string;
  committedQuantity: number;
  createdAt: string;
}

export interface BulkSaleUpdateRequest {
  expected_price: number;
  images: string[];
}

// export interface Offer {
//   id: string;
//   companyName: string;
//   offeredPrice: number;
//   createdAt: string;
// }
// export interface PostAuthor {
//   id: string;
//   name: string;
//   avatar: string;
// }

// export interface PostReactions {
//   like: number;
// }

export type PostType = 'ANNOUNCEMENT' | 'CAMPAIGN';

export interface BasePost {
  id: string;
  title: string;
  content: string;
  type: PostType;
  createdAt: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
  image?: string;
  /* marketplace */
  isPublished?: boolean;
}
export interface CampaignPost extends BasePost {
  type: 'CAMPAIGN';
  productName: string;
  expectedDate: string;
}

export type Post = AnnouncementPost | CampaignPost;
export type FeedResponse = Post[];
export interface MarketplacePost {
  id: number;
  campaignId: string;
  productName: string;
  totalQuantity: number;
  expectedPrice?: number;
  status: 'OPEN' | 'GATHERING';
  coopName: string;
  createdAt: string;
}
