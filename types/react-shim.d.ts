declare module 'react' {
  export const Fragment: any;
  export function createElement(type: any, props?: any, ...children: any[]): any;
  const React: any;
  export default React;
  export type FC<P = any> = (props: P) => any;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
  export const Fragment: any;
}

declare global {
  namespace React {
    type FC<P = any> = (props: P) => any;
    const Fragment: any;
  }
}

declare global {
  interface ImportMetaEnv {
    VITE_API_KEY?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
