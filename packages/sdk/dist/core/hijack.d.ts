import { config } from './config';
export type HijackFn = (typeof config.methodNames)[number];
export type HijackCallback = (fn: HijackFn, ...args: any[]) => void;
export declare function hijack(fn: HijackFn, callback: HijackCallback): void;
