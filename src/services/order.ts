import { getRepository, getConnection } from 'typeorm';
import Order from '../entity/Order';
import Product from '../entity/Product';

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
  await getConnection().transaction(async (manager) => {
    const order = await manager.createQueryBuilder().insert().into(Order).values({ userId }).execute()
    const orderId = order.raw.insertId;
    const productsArray = products.products.map(async (productId) => {
      manager.createQueryBuilder().update(Product)
        .set({ orderId }).where({ id: productId }).execute();
    });
    await Promise.all(productsArray);
  });
  const data = { order: { userId, products: products.products } };
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

export async function getAll(): Promise<ServicesResponse> {
  const result = await getRepository(Order).find({
    relations: ['products'],
  });
  const data = result.map((order) => ({
    ...order,
    products: order.products.map((product) => product.id),
  }));
  return { code: StatusCode.OK, data };
}