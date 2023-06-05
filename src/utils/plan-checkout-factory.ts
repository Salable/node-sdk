import { IPlanCheckoutInputParams, IPlanCheckoutParams } from '../types';

const planCheckoutFactory = (queryParams: IPlanCheckoutInputParams): IPlanCheckoutParams => {
  const { vat, customer, ...rest } = queryParams;
  return {
    ...rest,
    ...(vat?.companyName && { vatCompanyName: vat.companyName }),
    ...(vat?.city && { vatCity: vat.city }),
    ...(vat?.number && { vatNumber: vat.number }),
    ...(vat?.postcode && { vatPostcode: vat.postcode }),
    ...(vat?.state && { vatState: vat.state }),
    ...(vat?.street && { vatStreet: vat.street }),
    ...(vat?.country && { vatCountry: vat.country }),
    ...(customer?.country && { customerCountry: customer.country }),
    ...(customer?.email && { customerEmail: customer.email }),
    ...(customer?.postcode && { customerPostcode: customer.postcode }),
  };
};

export default planCheckoutFactory;
