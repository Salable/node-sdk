import {
  PaginatedSubscription,
  Subscription,
  PaginatedSubscriptionInvoice,
  SubscriptionPaymentLink,
  SubscriptionPaymentMethod,
  SubscriptionPlan,
  SubscriptionSeat,
  ApiRequest,
  TVersion,
  Version,
  GetAllSubscriptionsOptions,
  GetAllInvoicesOptions,
  UpdateSubscriptionInput,
  GetSubscriptionSeatsOptions,
  PaginatedSeats, GetSeatCountResponse, ManageSeatOptions, CreateSubscriptionInput
} from '../types';
import { v2SubscriptionMethods } from './v2';

export type SubscriptionVersions = {
  [Version.V2]: {
    /**
     *  Creates a subscription with the details provided
     *
     * @param {CreateSubscriptionInput} data - The details to create the new subscription with
     * @param {CreateSubscriptionInput} data.planUuid - The UUID of the plan associated with the subscription. The planUuid can be found on the Plan view in the Salable dashboard
     * @param {CreateSubscriptionInput} data.granteeId - (Optional) The grantee ID for the subscription.
     * @param {CreateSubscriptionInput} data.expiryDate - (Optional) Provide a custom expiry date for the subscription; this will override the plan's default interval.
     * @param {CreateSubscriptionInput} data.cancelAtPeriodEnd - (Optional) If set to true the subscription will not renew once the endTime date has passed.
     * @param {CreateSubscriptionInput} data.quantity - (Optional) The number of seats to create on the subscription. Default is the plan's minimum seat limit. Only applicable to per seat plans.
     *
     * @returns {Promise<Subscription>} The data for the new subscription created
     */
    create: (data: CreateSubscriptionInput) => Promise<Subscription>;
    /**
     *  Retrieves a list of all subscriptions.
     *
     *  @param {{ status?: SubscriptionStatus; email?: string; cursor?: string; take?: string; expand?: string[] }} options - Filter and pagination options
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptions
     *
     * @returns {Promise<PaginatedSubscription>} The data of the subscription requested
     */
    getAll: (options?: GetAllSubscriptionsOptions) => Promise<PaginatedSubscription>;

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
     *  Retrieves a list of a subscription's seats. Seats with the status "CANCELED" are ignored.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *  @param {GetSubscriptionSeatsOptions} data - The properties for cursor pagination
     *  @param {GetSubscriptionSeatsOptions} data.cursor - The ID (cursor) of the record to take from in the request
     *  @param {GetSubscriptionSeatsOptions} data.take - The number of records to fetch. Default 20.
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionsSeats
     *
     * @returns {Promise<PaginatedSeats>} The seats of the subscription requested
     */
    getSeats: (subscriptionUuid: string, options?: GetSubscriptionSeatsOptions) => Promise<PaginatedSeats>;

    /**
     *  Retrieves the aggregate number of seats. The response is broken down by assigned, unassigned and the total. Seats with the status `CANCELED` are ignored.
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionsSeatCount
     *
     * @returns {Promise<GetSeatCountResponse>}
     */
    getSeatCount: (subscriptionUuid: string) => Promise<GetSeatCountResponse>;

    /**
     *  Update a subscription.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *  @param {UpdateSubscriptionInput} data - The properties of the subscription to update
     *  @param {UpdateSubscriptionInput} data.owner - The ID of the entity that owns the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/changeSubscriptionsPlan
     *
     * @returns {Promise<Subscription>}
     */
    update: (
      subscriptionUuid: string,
      data: UpdateSubscriptionInput,
    ) => Promise<Subscription>;

    /**
     *  Changes a subscription's plan based on UUID. If the subscription is usage-based, the requested subscription will be canceled and a new subscription will be created on the plan you are changing to.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/changeSubscriptionsPlan
     *
     * @returns {Promise<void>}
     */
    changePlan: (
      subscriptionUuid: string,
      options: {
        planUuid: string;
        proration?: string;
      },
    ) => Promise<void>;

    /**
     *  Retrieves a list of invoices for a subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionInvoices
     *
     * @returns {Promise<PaginatedSubscriptionInvoice>}
     */
    getInvoices: (subscriptionUuid: string, options?: GetAllInvoicesOptions) => Promise<PaginatedSubscriptionInvoice>;

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
      options: {
        when: 'now' | 'end';
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
    reactivateSubscription: (subscriptionUuid: string) => Promise<void>;

    /**
     *  Manage seats on a subscription
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/manageSubscriptionSeats
     *
     * @returns {Promise<void>}
     */
    manageSeats: (
      subscriptionUuid: string,
      options: ManageSeatOptions[],
    ) => Promise<void>;

    /**
     *  Incrementing will create unassigned licenses.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/incrementSubscriptionSeats
     *
     * @returns {Promise<SubscriptionSeat>}
     */
    addSeats: (
      subscriptionUuid: string,
      options: {
        increment: number;
        proration?: string;
      },
    ) => Promise<SubscriptionSeat>;

    /**
     *  Decrementing will only remove unassigned licenses.
     *
     *  @param {string} subscriptionUuid - The UUID of the subscription
     *
     * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/decrementSubscriptionSeats
     *
     * @returns {Promise<SubscriptionSeat>}
     */
    removeSeats: (
      subscriptionUuid: string,
      options: {
        decrement: number;
        proration?: string;
      },
    ) => Promise<SubscriptionSeat>;

    /**
    *  Applies the specified coupon to the subscription.
    *
    * @param {string} subscriptionUuid - The UUID of the subscription
    * 
    * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/addCoupon
    *
    * @returns {Promise<void>}
    */
    addCoupon: (
      subscriptionUuid: string,
      options: {
        couponUuid: string
      },
    ) => Promise<void>;

    /**
    *  Removes the specified coupon from the subscription.
    *
    * @param {string} subscriptionUuid - The UUID of the subscription
    *
    * Docs - https://docs.salable.app/api/v2#tag/Subscriptions/operation/removeCoupon
    * 
    * @returns {Promise<void>}
    */
    removeCoupon: (
      subscriptionUuid: string,
      options: {
        couponUuid: string
      },
    ) => Promise<void>;
  };
};

export type SubscriptionVersionedMethods<V extends TVersion> = V extends keyof SubscriptionVersions ? SubscriptionVersions[V] : never;

export const subscriptionsInit = <V extends TVersion>(version: V, request: ApiRequest): SubscriptionVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2SubscriptionMethods(request) as SubscriptionVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
