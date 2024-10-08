import { ApiRequest } from '@/src';
import { SubscriptionVersions } from '..';
import {
    CancelWhen,
    Subscription,
    SubscriptionAddSeatsOptions,
    SubscriptionRemoveSeatsOptions,
    SubscriptionsChangePlanOptions,
} from '@/src/types';
import { RESOURCE_NAMES, SALABLE_BASE_URL } from '@/src/constants';

export const v2SubscriptionMethods = (request: ApiRequest): SubscriptionVersions['v2'] => ({
    getOne: async (subscriptionUuid: string): Promise<Subscription> => {
        return request(`${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}`, {
            method: 'GET',
        }) as unknown as Subscription;
    },

    changePlan: async (
        subscriptionUuid: string,
        config: SubscriptionsChangePlanOptions,
    ): Promise<void> => {
        return request(
            `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/change-plan`,
            {
                method: 'PUT',
                body: JSON.stringify(config),
            },
        ) as unknown as void;
    },

    cancel: async (subscriptionUuid: string, when: CancelWhen): Promise<void> => {
        return request(
            `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/change?when=${when}`,
            {
                method: 'PUT',
            },
        ) as unknown as void;
    },

    addSeats: async (
        subscriptionUuid: string,
        options: SubscriptionAddSeatsOptions,
    ): Promise<void> => {
        return request(
            `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/seats`,
            {
                method: 'POST',
                body: JSON.stringify(options),
            },
        ) as unknown as void;
    },

    removeSeats: async (
        subscriptionUuid: string,
        options: SubscriptionRemoveSeatsOptions,
    ): Promise<void> => {
        return request(
            `${SALABLE_BASE_URL}/${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/seats`,
            {
                method: 'PUT',
                body: JSON.stringify(options),
            },
        ) as unknown as void;
    },
});
