import { ApiRequest } from '@/src';
import { SubscriptionVersions } from '..';
import {
    GetAllLicensesResponse,
    SearchParamOptions,
    Subscription,
    SubscriptionInvoice,
    SubscriptionPaymentLink,
    SubscriptionPaymentMethod,
    SubscriptionPlan,
    SubscriptionsChangePlan,
    SubscriptionSeatResponse,
} from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';
import getUrl from '@/src/utils/get-url';

const baseUrl = `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}`;

export const v2SubscriptionMethods = (request: ApiRequest): SubscriptionVersions['v2'] => ({
  getAll: async (options): Promise<GetAllLicensesResponse> => {
    return request(getUrl(baseUrl, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as GetAllLicensesResponse;
  },

  getOne: async (subscriptionUuid: string, options): Promise<Subscription> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}`, options as SearchParamOptions), {
      method: 'GET',
    }) as unknown as Subscription;
  },

  changePlan: async (subscriptionUuid: string, options): Promise<SubscriptionsChangePlan> => {
    return request(
      getUrl(`${baseUrl}/${subscriptionUuid}/change-plan`, options as SearchParamOptions),
      {
        method: 'PUT',
      },
    ) as unknown as SubscriptionsChangePlan;
  },

  getInvoices: async (subscriptionUuid: string): Promise<SubscriptionInvoice> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/invoices`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionInvoice;
  },

  getSwitchablePlans: async (subscriptionUuid: string): Promise<SubscriptionPlan[]> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/updateplan/listplans`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionPlan[];
  },

  cancel: async (subscriptionUuid: string, options): Promise<void> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/cancel`, options as SearchParamOptions), {
      method: 'PUT',
    }) as unknown as void;
  },

  getUpdatePaymentLink: async (subscriptionUuid: string): Promise<SubscriptionPaymentLink> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/updatepaymentlink`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionPaymentLink;
  },

  getPortalLink: async (subscriptionUuid: string): Promise<SubscriptionPaymentLink> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/customer-portal`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionPaymentLink;
  },

  getCancelSubscriptionLink: async (subscriptionUuid: string): Promise<SubscriptionPaymentLink> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/cancelpaymentlink`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionPaymentLink;
  },

  getPaymentMethod: async (subscriptionUuid: string): Promise<SubscriptionPaymentMethod> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/payment-method`, {}), {
      method: 'GET',
    }) as unknown as SubscriptionPaymentMethod;
  },

  reactiveSubscription: async (subscriptionUuid: string): Promise<void> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/reactivate`, {}), {
      method: 'PUT',
    }) as unknown as void;
  },

  addSeats: async (
    subscriptionUuid: string,
    options,
  ): Promise<SubscriptionSeatResponse> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/seats`, {}), {
      method: 'POST',
      body: JSON.stringify(options),
    }) as unknown as SubscriptionSeatResponse;
  },

  removeSeats: async (
    subscriptionUuid: string,
    options,
  ): Promise<SubscriptionSeatResponse> => {
    return request(getUrl(`${baseUrl}/${subscriptionUuid}/seats`, {}), {
      method: 'PUT',
      body: JSON.stringify(options),
    }) as unknown as SubscriptionSeatResponse;
  },
});
