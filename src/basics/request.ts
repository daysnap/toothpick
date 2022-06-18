
import { PromisifySuccessResult, call, FailCallbackResult } from 'src/core'

interface RequestSuccessCallbackResult {

}

export interface RequestOption {
  success?: (result: RequestSuccessCallbackResult) => void
  fail?: (err: FailCallbackResult) => void
}

export const request = (
  options: RequestOption
): PromisifySuccessResult<RequestOption> => {
  return call<RequestOption>(options)
}
