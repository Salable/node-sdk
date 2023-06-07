declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALABLE_BASE_URL: string;
      SALABLE_API_KEY: string;
      EMPTY_PRODUCT_UUID: string;
      POPULATED_PRODUCT_UUID: string;
      POPULATED_PLAN_UUID: string;
      INVALID_PLAN_UUID: string;
    }
  }
}

export {};
