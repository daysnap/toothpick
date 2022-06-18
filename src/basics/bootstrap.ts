
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

interface BootstrapOptions {
  success?: BootstrapSuccessCallback
  fail?: BootstrapFailCallback
  year?: string
}


export const bootstrap =<T extends BootstrapOptions = BootstrapOptions> (
  options: T
): PromisifySuccessResult<T, BootstrapOptions> => {
  return
}

// bootstrap({
//   success: () => {}
// }).then((res) => {
//   res.name
// })
