import {
  BaseActions,
  FailCallbackResult,
  withBasics
} from 'src/core'

interface RequestSuccessCallbackResult<T> {
  data: any
}

export interface RequestOption<T> {
  url: string,
  data?: any,
  timeout?: number,
  success?: (result: RequestSuccessCallbackResult<T>) => void
  fail?: (err: FailCallbackResult) => void
}

export const request = <
  P = any,
  T extends RequestOption<P> = RequestOption<P>
>(
  options: T
) =>
  withBasics<T, RequestOption<P>>(BaseActions.REQUEST)(options)

// const

request({
  url: '12321',
  // success: res => {},
  // fail: () => {}
}).then((res) => {
  res.data
})

type State<T> = {
  value: T
}

type Reducer<T, S extends State<T>, A> = (state: S, action: A) => S
