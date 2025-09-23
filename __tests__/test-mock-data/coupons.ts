import { CouponDuration, CouponStatus, DiscountType } from '@prisma/client';
import objectBuilder from './object-builder';

export const mockCoupon = objectBuilder({
  status: 'ACTIVE' as CouponStatus,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Percentage Coupon',
  duration: 'ONCE' as CouponDuration,
  discountType: 'PERCENTAGE' as DiscountType,
  paymentIntegrationCouponId: 'test-payment-integration-id',
  percentOff: 10,
  expiresAt: null,
  maxRedemptions: null,
  isTest: false,
  durationInMonths: 1,
});
