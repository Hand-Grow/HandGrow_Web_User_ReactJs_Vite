export interface JoinRequest {
  id: string;
  farmerName: string;
  farmerPhone: string;
  farmerAddress: string;
  cooperativeName: string;
  status: JoinRequestStatus;
  responseMessage?: string;
  createdAt: string;
}
export interface CreateJoinRequestPayload {
  cooperativeId: string;
}
export enum JoinRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export interface RespondJoinRequestPayload {
  approved: boolean;
  responseMessage: string;
}
export const statusConfig: Record<
  JoinRequestStatus,
  { label: string; color: string }
> = {
  [JoinRequestStatus.PENDING]: {
    label: 'Chờ duyệt',
    color: 'bg-orange-100 text-orange-700',
  },
  [JoinRequestStatus.APPROVED]: {
    label: 'Hoạt động',
    color: 'bg-emerald-100 text-emerald-700',
  },
  [JoinRequestStatus.REJECTED]: {
    label: 'Từ chối',
    color: 'bg-red-100 text-red-700',
  },
};
