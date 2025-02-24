import { ApiRequest, Session, SessionMetaData, SessionScope, TVersion, Version } from '../types';
import { v2SessionMethods } from './v2';

export type SessionVersions = {
  [Version.V2]: {
    /**
     *  Creates a new session to use with the Salable web components
     *
     * @param {CreateSessionInput} data - The details to create the new session with
     * @param {CreateSessionInput} data.scope - The scope of the session
     * @param {CreateSessionInput} data.metadata - The metadata for the session
     *
     * @returns {Promise<Session>} The data for the new session created
     */
    createSession: <T extends SessionScope>(data: { scope: T; metadata: SessionMetaData<T> }) => Promise<Session>;
  };
};

export type SessionVersionedMethods<V extends TVersion> = V extends keyof SessionVersions ? SessionVersions[V] : never;

export const sessionsInit = <V extends TVersion>(version: V, request: ApiRequest): SessionVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2SessionMethods(request) as SessionVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};
