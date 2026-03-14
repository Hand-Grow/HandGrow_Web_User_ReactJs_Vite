import httpClient from '../http/httpClient';
import { API_ENDPOINTS } from '@/src/constants/apiEndpoints';

export const marketplaceApi = {
  getBulkSales(params) {
    const searchParams = new URLSearchParams();
    if (params?.product) searchParams.append('product', params.product);
    if (params?.min_qty) searchParams.append('min_qty', params.min_qty);
    if (params?.page !== undefined) searchParams.append('page', params.page);

    const url = searchParams.toString()
      ? `${API_ENDPOINTS.MARKETPLACE.BULK_SALES}?${searchParams}`
      : API_ENDPOINTS.MARKETPLACE.BULK_SALES;
    return httpClient.get(url);
  },

  getBulkSaleDetail(id) {
    return httpClient.get(API_ENDPOINTS.MARKETPLACE.BULK_SALE_DETAIL(id));
  },

  createOffer(bulkSaleId, data) {
    return httpClient.post(
      API_ENDPOINTS.MARKETPLACE.CREATE_OFFER(bulkSaleId),
      data
    );
  },

  getMyOffers(params) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page !== undefined) searchParams.append('page', params.page);

    const url = searchParams.toString()
      ? `${API_ENDPOINTS.MARKETPLACE.MY_OFFERS}?${searchParams}`
      : API_ENDPOINTS.MARKETPLACE.MY_OFFERS;

    return httpClient.get(url);
  },
};
