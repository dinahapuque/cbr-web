/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAM_URL: string;
  readonly VITE_STATION_NAME: string;
  readonly VITE_NOWPLAYING_PROVIDER: 'zeno' | 'radioco' | 'none';
  readonly VITE_ZENO_MOUNT_ID: string;
  readonly VITE_RADIOCO_STATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
