interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BUILD_ENV: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare const __HOST__: string
declare const __TableCustomVersion__: string