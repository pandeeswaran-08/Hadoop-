/// <reference types="vite/client" />

declare module 'react' {
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useRef<T = any>(initialValue?: T | null): { current: T };
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps?: readonly any[]): T;
  export const Fragment: any;
  const React: any;
  export default React;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
