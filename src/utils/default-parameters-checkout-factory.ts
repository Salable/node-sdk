import { ICheckoutCustomerParams, ICheckoutVatParams, IDefaultCheckoutInputParams } from '../types';

export interface ICheckoutDefaultParameters extends ICheckoutCustomerParams, ICheckoutVatParams {
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
  customMessage?: string;
}

const defaultParametersCheckoutFactory = (
  queryParams: IDefaultCheckoutInputParams
): ICheckoutDefaultParameters => {
  const { vat, customer } = queryParams;
  let params: ICheckoutDefaultParameters = {
    marketingConsent: queryParams.marketingConsent,
    couponCode: queryParams.couponCode,
    promoCode: queryParams.promoCode,
    allowPromoCode: queryParams.allowPromoCode,
    customMessage: queryParams.customMessage,
  };
  if (customer) {
    params = Object.assign(params, {
      customerEmail: customer.email,
      customerCountry: customer.country,
      customerPostcode: customer.postcode,
    });
  }
  if (vat) {
    params = Object.assign(params, {
      vatCompanyName: vat.companyName,
      vatCity: vat.city,
      vatNumber: vat.number,
      vatPostcode: vat.postcode,
      vatState: vat.state,
      vatStreet: vat.street,
      vatCountry: vat.country,
    });
  }
  return params;
};

export default defaultParametersCheckoutFactory;
