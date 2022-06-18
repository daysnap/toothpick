
import { call, Options } from './call'

export const withCurrying =
  <T>(service: Options<T>['service']) =>
    (action: Options<T>['action']) =>
      (options: Omit<Options<T>, 'service' | 'action'> = {}) =>
        call<T>(Object.assign({ service, action }, options))
