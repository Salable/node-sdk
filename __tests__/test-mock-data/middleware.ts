import objectBuilder from './object-builder';
import {
  IMiddlewareProxyContext,
  IMiddlewareProxyEvent,
} from 'utilities/interfaces/middleware/middleware.interface';
import { mockApiGatewayRequestEventContext } from './apigateway';

export const mockContext = objectBuilder<IMiddlewareProxyContext>({
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
  errors: [],
  fail(): void {
    return;
  },
  done(): void {
    return;
  },
  succeed(): void {
    return;
  },
  getRemainingTimeInMillis(): number {
    return 0;
  },
});

export const mockEvent = objectBuilder<IMiddlewareProxyEvent>({
  Records: [],
  body: '',
  data: {} as Record<string, unknown>,
  headers: {},
  httpMethod: '',
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: null,
  path: '',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: mockApiGatewayRequestEventContext(),
  resource: '',
  stageVariables: null,
  source: '',
});
