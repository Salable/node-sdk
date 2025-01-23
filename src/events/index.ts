import { ApiRequest, TVersion, Version, Event } from '../types';
import { v2EventMethods } from './v2';

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
};

export type EventVersionedMethods<V extends TVersion> = V extends keyof EventVersions ? EventVersions[V] : never;

export const eventsInit = <V extends TVersion>(version: V, request: ApiRequest): EventVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2EventMethods(request) as EventVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
