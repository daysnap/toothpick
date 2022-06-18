
import { withCurrying, Options } from 'src/core'

export const withBasics =
  <T>(action: Options<T>['action']) =>
    withCurrying(action)
