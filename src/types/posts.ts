export type PostType = 'ANNOUNCEMENT' | 'COLLECTION' | 'SELL';

export interface BasePost {
  id: number;
  type: PostType;
  content: string;
  createdAt: string;
  reactions: Record<string, number>;
  comments: string[];
  author: Author;
}
export interface Author {
  id: number;
  name: string;
  avatar: string;
}
export interface CollectionPost extends BasePost {
  type: 'COLLECTION';
  productName: string;
  expectedDate: string;
  totalCommitted: number;
}

export interface SellPost extends BasePost {
  type: 'SELL';
  productName: string;
  quantity: number;
  price: number;
  negotiations: number;
}

export interface AnnouncementPost extends BasePost {
  type: 'ANNOUNCEMENT';
}

export type Post = AnnouncementPost | CollectionPost | SellPost;
