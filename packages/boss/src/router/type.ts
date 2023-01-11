import { RouteObject as Route } from 'react-router-dom'

export type RouteObject = Omit<Route, 'children'> & {
  hidden?: boolean
  children?: RouteObject[]
  meta?: {
    title?: string
  }
}
