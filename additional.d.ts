declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALABLE_BASE_URL: string;
      SALABLE_API_KEY: string;
    }
  }
}

export {};
