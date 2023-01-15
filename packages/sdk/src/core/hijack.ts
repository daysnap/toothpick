import { isFunction } from '../utils'
import { config } from './config'

export type HijackFn = (typeof config.methodNames)[number]

export type HijackCallback = (fn: HijackFn, ...args: any[]) => void

export function hijack(fn: HijackFn, callback: HijackCallback) {
  const consoleFn = console[fn]
  if (isFunction(consoleFn)) {
    console[fn] = function (...args: any) {
      callback(fn, ...args)
      consoleFn.apply(console, args)
    } as any
  }
}
