import prismaClient from '../prisma/prisma-client';
import { planData, productData } from './data';

const mockElements = async () => {
  const mockProduct = await prismaClient.product.create({
    data: productData,
  });

  const mockPlan = await prismaClient.plan.create({
    data: {
      productUuid: mockProduct.uuid,
      ...planData,
      capabilities: {},
      features: {},
    },
  });

  return {
    mockProduct,
    mockPlan,
  };
};

export default mockElements;
