export interface StatusCodeInterface {
  readonly OK: number;
  readonly CREATED: number;
  readonly NO_CONTENT: number;
  readonly BAD_REQUEST: number;
  readonly UNAUTHORIZED: number;
  readonly NOT_FOUND: number;
  readonly CONFLICT: number;
  readonly UNPROCCESSABLE_ENTITY: number;
  readonly INTERNAL_SERVER_ERROR: number;
  readonly 'string.empty': number;
  readonly 'string.min': number;
  readonly 'string.base': number;
  readonly 'number.base': number;
  readonly 'number.min': number;
  readonly 'any.required': number;
  readonly 'array.base': number;
  readonly 'array.min': number;
}