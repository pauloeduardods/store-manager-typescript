import { getRepository } from 'typeorm';
import Order from '../entity/Order';

import { updateOrderId } from '../models/product';
import { create as createOrder } from '../models/order';
import { ServicesResponse } from '../interfaces/servicesResponse';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';
import { IOrder } from '../interfaces/order';
import productsValidation from '../validations/order';

export async function create(products: IOrder, userId:number): Promise<ServicesResponse> {
  const validation = productsValidation.validate(products);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof StatusCodeInterface,
      validation.error.details[0].message,
    );
  }
  const orderId = await createOrder(userId);
  const arrayPromise = products.products.map(async (productId: number) =>
    updateOrderId(productId, orderId));
  await Promise.all(arrayPromise);
  const data = {
    order: {
      userId,
      products: products.products,
    },
  };
  return { code: StatusCode.CREATED, data };
}

export async function getById(oderId: number): Promise<ServicesResponse> {
  const result = await getRepository(Order).findOne({
    where: { id: oderId },
    relations: ['products'],
  });
  if (!result) {
    throw new ServiceError('NOT_FOUND', 'Order not found');
  }
  const data = {
    ...result,
    products: result.products.map((product) => product.id),
  };
  return { code: StatusCode.OK, data };
}