/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUTH_SERVICE_URL: string;
  readonly COINS_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
