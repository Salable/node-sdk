import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import objectBuilder from './object-builder';

export const mockApiGatewayContext = objectBuilder<Context>({
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
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

export const mockApiGatewayIdentity = objectBuilder({
  accessKey: null,
  accountId: null,
  apiKey: null,
  apiKeyId: null,
  caller: null,
  clientCert: null,
  cognitoAuthenticationProvider: null,
  cognitoAuthenticationType: null,
  cognitoIdentityId: null,
  cognitoIdentityPoolId: null,
  principalOrgId: null,
  sourceIp: '',
  user: null,
  userAgent: null,
  userArn: null,
});

export const mockApiGatewayRequestEventContext = objectBuilder({
  accountId: '',
  apiId: '',
  authorizer: undefined,
  protocol: '',
  httpMethod: '',
  identity: mockApiGatewayIdentity(),
  path: '',
  stage: '',
  requestId: '',
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: '',
});

export const mockApiGatewayEvent = objectBuilder<APIGatewayProxyEvent>({
  body: '',
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
});
