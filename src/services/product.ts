import { getRepository } from 'typeorm';
import Product from '../entity/Products';

import { IProduct } from '../interfaces/entity';
import { ServicesResponse } from '../interfaces/servicesResponse';
import productValidation from '../validations/product';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';

interface Sla {
  name: string;
  amount: string;
}

export async function create(product:Sla): Promise<ServicesResponse> {
  const validation = productValidation.validate(product);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof StatusCodeInterface,
      validation.error.details[0].message,
    );
  }
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

export async function getAll(): Promise<ServicesResponse> {
  const products: IProduct[] = await getRepository(Product).find();
  return { code: StatusCode.OK, data: products };
}