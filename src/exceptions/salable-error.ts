export enum ErrorCodes {
  unauthorised = 'S1000',
  unauthenticated = 'S1001',
  notFound = 'S1002',
  badRequest = 'S1003',
  validation = 'S1004',
  unhandled = 'S1005',
  unknown = 'S1006',
}

export type ValidationErrorMessage = {
  property: string;
  error: string | ValidationErrorMessage[];
};

export type ValidationError = {
  validationErrors: ValidationErrorMessage[];
};

export type ResponseError = {
  error: string;
};

export class SalableError extends Error {
  code: string;
  data?: Record<string, unknown> | null;

  constructor(code: ErrorCodes, data?: Record<string, unknown> | null) {
    super(JSON.stringify({ data }));
    this.code = code;
    this.data = data;
  }
}

export class SalableResponseError extends SalableError {
  constructor(code: ErrorCodes, data?: ResponseError) {
    super(code, data);
    Object.setPrototypeOf(this, SalableResponseError.prototype);
  }
}

export class SalableValidationError extends SalableError {
  constructor(code: ErrorCodes, data: ValidationError) {
    super(code, data);
    Object.setPrototypeOf(this, SalableValidationError.prototype);
  }
}

export class SalableUnknownError extends Error {
  code: string;
  error?: string;

  constructor(error?: string) {
    super();
    Object.setPrototypeOf(this, SalableUnknownError.prototype);
    this.code = ErrorCodes.unknown;
    this.error = error ?? 'Salable SDK error';
  }
}
