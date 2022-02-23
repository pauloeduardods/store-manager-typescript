import { StatusCodeInterface } from './statusCode';

export default interface Error {
  type: keyof StatusCodeInterface;
  message: string;
}