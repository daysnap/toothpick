
import { PromisifySuccessResult, call } from 'src/core'

interface BootstrapSuccessCallback {
  (result: BootstrapSuccessCallbackResult): void
}

interface BootstrapSuccessCallbackResult {
  name: string
  age: number
}

interface BootstrapFailCallback {
  (err: any): void
}

interface BootstrapOption {
  success?: BootstrapSuccessCallback
  fail?: BootstrapFailCallback
  year?: string
}

export const bootstrap = (options: BootstrapOption) : PromisifySuccessResult<BootstrapOption> => {
  const { success, fail } = options
  const result = { name: '张三', age: 12 }
  if (success) {
    success(result)
    return
  }
  return new Promise((resolve, reject) => resolve(result))
}

bootstrap({

}).then((res) => {
  res.name
})
