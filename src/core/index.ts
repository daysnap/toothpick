
import { log, nf } from 'src/utils'

interface AsyncMethodOptionLike {
  success?: (...args: any[]) => void
}

type PromisifySuccessResult1<
  P,
  T extends AsyncMethodOptionLike
> =
  P extends { success: any }
  ? void
  : P extends { fail: any }
  ? void
  : Promise<Parameters<Exclude<T['success'], undefined>>[0]>

export type PromisifySuccessResult<
  T extends AsyncMethodOptionLike
  > =
  T extends { success: any }
    ? void
    : T extends { fail: any }
      ? void
      : Promise<Parameters<Exclude<T['success'], undefined>>[0]>

interface FailCallbackResult {
  code?: number
  message?: string
}

enum Code {
  SUCCESS = 0,
  FAIL = 999
}

interface SuccessCallbackResult<T> {
  code: number
  message?: string
  data?: T
}

interface SuccessCallback<T> {
  (result: SuccessCallbackResult<T>): void
}

interface FailCallback {
  (err: FailCallbackResult): void
}

declare var DsBox:{
  call<T> (
    success: SuccessCallback<T>,
    fail: FailCallback,
    service: string,
    action: string,
    params: any
  ): void
}

interface CoreOptions<T> {
  success?(data: T): void
  fail?: FailCallback
  service?: string
  action?: string
  params?: string
}


export const core = <T>(options: CoreOptions<T>) => {
  const {
    success,
    fail,
    service,
    action,
    params
  } = options
  DsBox.call<T>(
    res => {
      log(service, action, '请求返回 => ', res)
      const { code, data } = res
      code === Code.SUCCESS ? success(data) : fail(res)
    },
    err => {
      log(service, action, '请求错误 => ', err)
      fail(err)
    },
    service,
    action,
    params
  )
}


