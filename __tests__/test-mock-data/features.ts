import objectBuilder from './object-builder';

export const mockFeature = objectBuilder({
  name: 'Boolean Feature Name',
  description: 'Feature description',
  displayName: 'Boolean Feature Display Name',
  variableName: 'boolean_feature',
  status: 'ACTIVE',
  visibility: 'public',
  valueType: 'boolean',
  defaultValue: 'false',
  showUnlimited: false,
  sortOrder: 0,
});

export const mockPlanFeature = objectBuilder({
  value: 'xxxxx',
  isUnlimited: undefined as boolean | undefined,
  isUsage: undefined as boolean | undefined, // deprecated
  pricePerUnit: 10, // deprecated
  minUsage: 1, // deprecated
  maxUsage: 100, // deprecated
});
