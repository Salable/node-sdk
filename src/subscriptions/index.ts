import { ApiRequest, TVersion, Version } from '..';
import {
  CancelWhen,
  SubscriptionRemoveSeatsOptions,
  Subscription,
  SubscriptionAddSeatsOptions,
  SubscriptionsChangePlanOptions,
} from '../types';
import { v2SubscriptionMethods } from './v2';

export type SubscriptionVersions = {
  [Version.V2]: {
    /**
     *  Get a single subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * @returns {Promise<Subscription>} The data of the subscription requested
     */
    getOne: (subscriptionUuid: string) => Promise<Subscription>;

    /**
     *  Change a subscription's plan
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *  @param {object} SubscriptionsChangePlanOptions - Change subscription plan options
     *
     * @returns {Promise<void>}
     */
    changePlan: (
      subscriptionUuid: string,
      options: SubscriptionsChangePlanOptions,
    ) => Promise<void>;

    /**
     *  Cancel's a subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *  @param {enum} CancelWhen - when Whether you want to cancel the subscription now or end of cycle
     *
     * @returns {Promise<void>}
     */
    cancel: (subscriptionUuid: string, when: CancelWhen) => Promise<void>;

    /**
     *  Add Seats to a Subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *  @param {object} SubscriptionAddSeatsOptions - Options to be passed in to the add seats method
     *
     * @returns {Promise<void>}
     */
    addSeats: (subscriptionUuid: string, options: SubscriptionAddSeatsOptions) => Promise<void>;

    /**
     *  Remove Seats from a Subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *  @param {object} SubscriptionRemoveSeatsOptions - Options to be passed in to the add seats method
     *
     * @returns {Promise<void>}
     */
    removeSeats: (
      subscriptionUuid: string,
      options: SubscriptionRemoveSeatsOptions,
    ) => Promise<void>;
  };
};

export type SubscriptionVersionedMethods<V extends TVersion> = V extends keyof SubscriptionVersions
  ? SubscriptionVersions[V]
  : never;

export const SubscriptionsInit = <V extends TVersion>(
  version: V,
  request: ApiRequest,
): SubscriptionVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2SubscriptionMethods(request) as SubscriptionVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
