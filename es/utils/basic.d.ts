import type { ComponentPublicInstance } from 'vue';
export declare function noop(): void;
export declare const extend: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare const inBrowser: boolean;
export type Numeric = number | string;
export type ComponentInstance = ComponentPublicInstance<{}, any>;
export declare function get(object: any, path: string): any;
export type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function pick<T, U extends keyof T>(obj: T, keys: ReadonlyArray<U>, ignoreUndefined?: boolean): Writeable<Pick<T, U>>;
export declare const toArray: <T>(item: T | T[]) => T[];
