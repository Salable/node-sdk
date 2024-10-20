import { ApiRequest, TVersion, Version } from '..';
import { GetAllLicensesResponse, Subscription, SubscriptionInvoice, SubscriptionPaymentLink, SubscriptionPaymentMethod, SubscriptionPlan, SubscriptionsChangePlan, SubscriptionSeatResponse } from '../types';
import { v2SubscriptionMethods } from './v2';

export type SubscriptionVersions = {
  [Version.V2]: {
    /**
     *  Retrieves a list of all subscriptions.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptions
     *
     * @returns {Promise<GetAllLicensesResponse>} The data of the subscription requested
     */
    getAll: (options?: { status?: 'active' | 'canceled' | 'paused' | 'trailing' | 'deleted' | 'past_due' | 'incomplete'; email?: string; cursor?: string; take?: string; expand?: string[] }) => Promise<GetAllLicensesResponse>;

    /**
     *  Retrieves the subscription data based on the UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionByUuid
     *
     * @returns {Promise<Subscription>} The data of the subscription requested
     */
    getOne: (
      subscriptionUuid: string,
      options?: {
        expand: string[];
      },
    ) => Promise<Subscription>;

    /**
     *  Changes a subscription's plan based on UUID. If the subscription is usage based the requested subscription will be canceled and a new subscription will be created on the plan you are changing to.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/changeSubscriptionsPlan
     *
     * @returns {Promise<SubscriptionsChangePlan>}
     */
    changePlan: (
      subscriptionUuid: string,
      options: {
        planUuid: string;
        proration?: string;
      },
    ) => Promise<SubscriptionsChangePlan>;

    /**
     *  Retrieves a list of invoices for a subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionInvoices
     *
     * @returns {Promise<SubscriptionInvoice>}
     */
    getInvoices: (subscriptionUuid: string) => Promise<SubscriptionInvoice>;

    /**
     *  Retrieves a list of available plans that a subscribed user can switch to
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionUpdatablePlans
     *
     * @returns {Promise<SubscriptionPlan[]>}
     */
    getSwitchablePlans: (subscriptionUuid: string) => Promise<SubscriptionPlan[]>;

    /**
     *  Cancels a subscription by providing the `subscriptionUuid` It will cancel immediately or at the end of the Subscription based on value of the `when` query parameter.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/cancelSubscription
     *
     * @returns {Promise<void>}
     */
    cancel: (
      subscriptionUuid: string,
      when: {
        when?: 'now' | 'end';
      },
    ) => Promise<void>;

    /**
     *  Retrieves the update payment link for a specific subscription. The link opens up a management portal for your payment integration that will have an option for the customer to update their payment details.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionUpdatePaymentLink
     *
     * @returns {Promise<SubscriptionPaymentLink>}
     */
    getUpdatePaymentLink: (subscriptionUuid: string) => Promise<SubscriptionPaymentLink>;

    /**
     *  Retrieves the customer portal link for a subscription. The link opens up a subscription management portal for your payment integration that will have an options for the customer to manage their subscription.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionCustomerPortalLink
     *
     * @returns {Promise<SubscriptionPaymentLink>}
     */
    getPortalLink: (subscriptionUuid: string) => Promise<SubscriptionPaymentLink>;

    /**
     *  Retrieves the cancel subscription link for a specific subscription. The link opens up a subscription management portal for your payment integration that will have an option for the customer to cancel the subscription.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionCancelLink
     *
     * @returns {Promise<SubscriptionPaymentLink>}
     */
    getCancelSubscriptionLink: (subscriptionUuid: string) => Promise<SubscriptionPaymentLink>;

    /**
     *  Retrieves the payment method used to pay for a subscription.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionPaymentMethod
     *
     * @returns {Promise<SubscriptionPaymentMethod>}
     */
    getPaymentMethod: (subscriptionUuid: string) => Promise<SubscriptionPaymentMethod>;

    /**
     *  Reactivate a Subscription's scheduled cancellation before the billing period has passed. If the billing period has passed and the Subscription has already been canceled please create a new Subscription.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription to cancel
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionReactivate
     *
     * @returns {Promise<void>}
     */
    reactiveSubscription: (subscriptionUuid: string) => Promise<void>;

    /**
     *  Incrementing will create unassigned licenses.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/incrementSubscriptionSeats
     *
     * @returns {Promise<SubscriptionSeatResponse>}
     */
    addSeats: (
      subscriptionUuid: string,
      options: {
        increment: number;
        proration?: string;
      },
    ) => Promise<SubscriptionSeatResponse>;

    /**
     *  Decrementing will only remove unassigned licenses.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/decrementSubscriptionSeats
     *
     * @returns {Promise<SubscriptionSeatResponse>}
     */
    removeSeats: (
      subscriptionUuid: string,
      options: {
        decrement: number;
        proration?: string;
      },
    ) => Promise<SubscriptionSeatResponse>;
  };
};

export type SubscriptionVersionedMethods<V extends TVersion> = V extends keyof SubscriptionVersions ? SubscriptionVersions[V] : never;

export const SubscriptionsInit = <V extends TVersion>(version: V, request: ApiRequest): SubscriptionVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2SubscriptionMethods(request) as SubscriptionVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
