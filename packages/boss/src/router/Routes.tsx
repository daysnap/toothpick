import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { RouteObject } from './type'
import { Loadable } from './Loadable'

const HomeView = Loadable(lazy(() => import('@/views/Home')))
const SessionView = Loadable(lazy(() => import('@/views/Session')))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeView />,
    meta: { title: '首页' },
  },
  {
    path: '/session/:userId',
    element: <SessionView />,
    meta: { title: '会话' },
  },
]

export function Routes() {
  return useRoutes(routes as any)
}
