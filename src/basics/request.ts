
import { BaseActions, FailCallbackResult, withBasics } from 'src/core'

export interface RequestOptions<T = any> {
  url: string,
  data?: any,
  timeout?: number,
  success?: (result: T) => void
  fail?: (err: FailCallbackResult) => void
}

export const request = <
  P = any,
  T extends RequestOptions<P> = RequestOptions<P>,
>(options: T) =>
  withBasics<T, RequestOptions<P>>(BaseActions.REQUEST)(options)
