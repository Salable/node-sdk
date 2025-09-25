import objectBuilder from './object-builder';

// deprecated
export const mockCapability = objectBuilder({
  name: 'test_capability',
  status: 'ACTIVE',
  description: 'Capability description',
});
