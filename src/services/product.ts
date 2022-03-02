import { getRepository } from 'typeorm';
import Product from '../entity/Product';

import { IProduct, IProductCreate, IServicesResponse, IStatusCode } from '../interfaces';
import productValidation from '../validations/product';
import { ServiceError, StatusCode } from '../utils/errorUtils';

export function validateProduct(product: IProductCreate):void {
  const validation = productValidation.validate(product);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof IStatusCode,
      validation.error.details[0].message,
    );
  }
}

export async function create(product: IProductCreate): Promise<IServicesResponse> {
  const result = await getRepository(Product).insert(product);
  const productId = result.raw.insertId;
  const data = {
    item: {
      id: productId,
      name: product.name,
      amount: product.amount,
    },
  };
  return { code: StatusCode.CREATED, data };
}

export async function getAll(): Promise<IServicesResponse> {
  const products: IProduct[] = await getRepository(Product).find();
  return { code: StatusCode.OK, data: products };
}