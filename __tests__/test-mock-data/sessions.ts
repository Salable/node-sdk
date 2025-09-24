import objectBuilder from './object-builder';

export const mockSession = objectBuilder({
  organisationId: 'xxxxx',
  expiresAt: new Date(Date.now() + 10800000),
  value: 'xxxx',
  scope: '',
  isTest: true,
  metadata: {},
});
