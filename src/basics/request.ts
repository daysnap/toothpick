
import {
  BaseActions,
  FailCallbackResult,
  withBasics,
} from 'src/core'

export interface RequestOption<T = any> {
  url: string,
  data?: any,
  timeout?: number,
  success?: (result: T) => void
  fail?: (err: FailCallbackResult) => void
}

export const request = <
  P = any,
  T extends RequestOption<P> = RequestOption<P>,
>(
  options: T
) =>
  withBasics<T, RequestOption<P>>(BaseActions.REQUEST)(options)
