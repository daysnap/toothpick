
import { log, nf } from 'src/utils'
import { DsBox } from './ds-box'
import { Code } from './code'
import { Services } from './services'

export interface FailCallbackResult {
  code?: number
  message?: string
}

export type Options<T> =  {
  success? (data: T): void
  fail? (err: FailCallbackResult): void
  service: Services
  action: string
  [props: string]: any
}
const core = <T>(options: Options<T>): void => {
  const {
    success = nf,
    fail = nf,
    service,
    action,
    ...params
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

export type PromisifySuccessResult<
  P,
  T extends { success?: (...args: any[]) => void }
> = P extends { success: any }
  ? void
  : P extends { fail: any }
    ? void
      : Promise<Parameters<Exclude<T['success'], undefined>>[0]>

export const call = <
  T extends Options<any>,
  P extends Options<any>
>(
  options: T
): PromisifySuccessResult<T, P> => {
  const {
    success,
    fail,
  } = options

  if (success || fail) {
    core(options)
    return
  }

  return new Promise((success, fail) =>
    core(Object.assign({}, options, { success, fail }))
  ) as any
}
