import { GetAllFeaturesOptionsV3, GetAllFeaturesV3, TVersion, Version } from '../types';

export type FeatureVersions = {
  [Version.V3]: {
    /**
     *  Get all features
     *
     * @param GetAllFeaturesOptionsV3
     *
     *  @returns { Promise<GetAllFeaturesV3>}
     */
    getAll: (options: GetAllFeaturesOptionsV3) => Promise<GetAllFeaturesV3>;
  };
};

export type FeatureVersionedMethods<V extends TVersion> = V extends keyof FeatureVersions ? FeatureVersions[V] : never;