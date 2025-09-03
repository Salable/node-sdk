import { Session, SessionMetaData, SessionScope, TVersion, Version } from '../types';

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
    create: <T extends SessionScope>(data: { scope: T; metadata: SessionMetaData<T> }) => Promise<Session>;
  };
  [Version.V3]: SessionVersions['v2']
};

export type SessionVersionedMethods<V extends TVersion> = V extends keyof SessionVersions ? SessionVersions[V] : never;
