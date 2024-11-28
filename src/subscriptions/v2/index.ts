import { SubscriptionVersions } from '..';
import { SubscriptionSeatResponse, ApiRequest } from '../../types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '../../constants';
import getUrl from '../../utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}`;

export const v2SubscriptionMethods = (request: ApiRequest): SubscriptionVersions['v2'] => ({
  getAll: (options) => request(getUrl(baseUrl, options), { method: 'GET' }),
  getOne: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}`, options), { method: 'GET' }),
  changePlan: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/change-plan`, options), { method: 'PUT', body: JSON.stringify(options) }),
  getInvoices: (uuid) => request(getUrl(`${baseUrl}/${uuid}/invoices`, {}), { method: 'GET' }),
  getSwitchablePlans: (uuid) => request(getUrl(`${baseUrl}/${uuid}/updateplan/listplans`, {}), { method: 'GET' }),
  cancel: (uuid, options) => request(getUrl(`${baseUrl}/${uuid}/cancel`, options), { method: 'PUT' }),
  getUpdatePaymentLink: (uuid) => request(getUrl(`${baseUrl}/${uuid}/updatepaymentlink`, {}), { method: 'GET' }),
  getPortalLink: (uuid) => request(getUrl(`${baseUrl}/${uuid}/customer-portal`, {}), { method: 'GET' }),
  getCancelSubscriptionLink: (uuid) => request(getUrl(`${baseUrl}/${uuid}/cancelpaymentlink`, {}), { method: 'GET' }),
  getPaymentMethod: (uuid) => request(getUrl(`${baseUrl}/${uuid}/payment-method`, {}), { method: 'GET' }),
  reactivateSubscription: (uuid) => request(getUrl(`${baseUrl}/${uuid}/reactivate`, {}), { method: 'PUT' }),
  addSeats: (uuid, options) => request(`${baseUrl}/${uuid}/seats`, { method: 'POST', body: JSON.stringify(options) }),
  removeSeats: (uuid, options): Promise<SubscriptionSeatResponse> =>
    request(getUrl(`${baseUrl}/${uuid}/seats`, {}), {
      method: 'PUT',
      body: JSON.stringify(options),
    }),
});
