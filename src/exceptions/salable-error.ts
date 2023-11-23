import { ErrorCodes } from '@/src/base';

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
  status: number;
  code: string;
  data: Record<string, unknown> | null;

  constructor(code: ErrorCodes, status: number, data: Record<string, unknown> | null) {
    super(JSON.stringify({ data }));
    this.code = code;
    this.data = data;
    this.status = status;
  }
}

export class SalableResponseError extends SalableError {
  constructor(code: ErrorCodes, status: number, data: ResponseError) {
    super(code, status, data);
    Object.setPrototypeOf(this, SalableResponseError.prototype);
  }
}

export class SalableValidationError extends SalableError {
  constructor(code: ErrorCodes, status: number, data: ValidationError) {
    super(code, status, data);
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
