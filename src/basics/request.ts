
import { FailCallbackResult, withCurrying } from 'src/core'

interface RequestSuccessCallbackResult {
  data: string
}

export interface RequestOption {
  url: string,
  data?: any,
  timeout?: number,
  success?: (result: RequestSuccessCallbackResult) => void
  fail?: (err: FailCallbackResult) => void
}

export const request = <T extends RequestOption = RequestOption>(
  options: T
) => withCurrying<T, RequestOption>('http')('request')(options)

request({
  url: '12321',
  // success: (data) => {
  //   data.data
  // }
}).then((res) => {

}).catch()
