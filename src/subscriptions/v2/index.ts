import { ApiRequest } from '@/src';
import { SubscriptionVersions } from '..';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import getUrl from '@/src/utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}`;

export const v2SubscriptionMethods = (request: ApiRequest): SubscriptionVersions['v2'] => ({
  getAll: (options) => request(getUrl(baseUrl, options), { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  changePlan: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/change-plan`, options), { method: 'PUT' }),
  getInvoices: (uuid) => request(`${baseUrl}/${uuid}/invoices`, { method: 'GET' }),
  getSwitchablePlans: (uuid) => request(`${baseUrl}/${uuid}/updateplan/listplans`, { method: 'GET' }),
  cancel: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/cancel`, options), { method: 'PUT' }),
  getUpdatePaymentLink: (uuid) => request(`${baseUrl}/${uuid}/updatepaymentlink`, { method: 'GET' }),
  getPortalLink: (uuid) => request(`${baseUrl}/${uuid}/customer-portal`, { method: 'GET' }),
  getCancelSubscriptionLink: (uuid) => request(`${baseUrl}/${uuid}/cancelpaymentlink`, { method: 'GET' }),
  getPaymentMethod: (uuid) => request(`${baseUrl}/${uuid}/payment-method`, { method: 'GET' }),
  reactiveSubscription: (uuid) => request(`${baseUrl}/${uuid}/reactivate`, { method: 'PUT' }),
  addSeats: (uuid, options) => request(`${baseUrl}/${uuid}/seats`, { method: 'POST', body: JSON.stringify(options) }),
  removeSeats: (uuid, options) => request(`${baseUrl}/${uuid}/seats`, { method: 'PUT', body: JSON.stringify(options) }),
});
