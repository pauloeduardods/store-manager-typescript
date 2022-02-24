import { create as createOrder, getById as getOrderById } from '../models/order';
import { updateOrderId, getByOderId as getProductByOrderId } from '../models/product';
import { ServicesResponse } from '../interfaces/servicesResponse';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';
import { IOrder, IOrderResponse } from '../interfaces/order';
import productsValidation from '../validations/order';
import { Product } from '../interfaces/product';

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
  const orderResult = await getOrderById(oderId);
  if (!orderResult) {
    throw new ServiceError('NOT_FOUND', 'Order not found');
  }
  const { id, userId } = orderResult as IOrderResponse;
  const result = await getProductByOrderId(oderId);
  const products = result.map((product: Product) => product.id);
  const data = {
    id,
    userId,
    products,
  };
  return { code: StatusCode.OK, data };
}