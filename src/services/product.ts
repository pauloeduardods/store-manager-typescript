import { IProduct } from '../interfaces/product';
import { create as createProduct } from '../models/product';
import { ServicesResponse } from '../interfaces/servicesResponse';
import productValidation from '../validations/product';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';

export async function create(product: IProduct): Promise<ServicesResponse> {
  const validation = productValidation.validate(product);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof StatusCodeInterface,
      validation.error.details[0].message,
    );
  }
  const productId = await createProduct(product);
  const data = {
    item: {
      id: productId,
      name: product.name,
      amount: product.amount,
    },
  };
  return { code: StatusCode.CREATED, data };
}

export function sla() {

}