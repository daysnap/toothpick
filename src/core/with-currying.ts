
import { call, Options } from './call'
import { Services } from './services'
import { BaseActions } from './actions'

export type WithCurryingOptions = Omit<Options<any>, 'service' | 'action'>

type MergeOptions<T> = (T & Pick<Options<any>, 'service' | 'action'>)

export const withCurrying = <
  T extends WithCurryingOptions,
  P extends WithCurryingOptions
>(
  service: Options<any>['service']
) =>
  (action: Options<any>['action']) =>
    (options: T) =>
      call<MergeOptions<T>, MergeOptions<P>>(Object.assign({ service, action }, options))

export const withBasics = <
  T extends WithCurryingOptions,
  P extends WithCurryingOptions
>(
  action: BaseActions
) =>
  withCurrying<T, P>(Services.BASICS)(action)
