import objectBuilder from './object-builder';
import { IMiddlewareProxyResult } from 'utilities/interfaces/middleware/middleware.interface';

export const mockResponse = objectBuilder<IMiddlewareProxyResult>({
  statusCode: 200,
});

export const mockMiddlewareResponse = objectBuilder<IMiddlewareProxyResult>({
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
  statusCode: 200,
});
