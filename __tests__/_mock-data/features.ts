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
  isUsage: undefined as boolean | undefined,
  pricePerUnit: 10,
  minUsage: 1,
  maxUsage: 100,
});
