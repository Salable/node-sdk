declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALABLE_BASE_URL: string;
    }
  }
}

export {};
