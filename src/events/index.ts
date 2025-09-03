import { TVersion, Version, Event } from '../types';

export type EventVersions = {
  [Version.V2]: {
    /**
     *  Get one event
     *
     *  @param {string} uuid - The UUID of the event
     *
     *  @returns { Promise<Event>}
     */
    getOne: (uuid: string) => Promise<Event>;
  };
  [Version.V3]: EventVersions['v2'];
};

export type EventVersionedMethods<V extends TVersion> = V extends keyof EventVersions ? EventVersions[V] : never;