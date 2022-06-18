
import { call, Options } from './call'

type WithCurryingOptions = Omit<Options<any>, 'service' | 'action'>

type MergeOptions<T> = (T & Pick<Options<any>, 'service' | 'action'>)

export const withCurrying = <
  T extends WithCurryingOptions,
  P extends WithCurryingOptions
>(service: Options<any>['service']) =>
  (action: Options<any>['action']) =>
    (options: T) =>
      call<MergeOptions<T>, MergeOptions<P>>(Object.assign({ service, action }, options))
