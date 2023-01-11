import { Suspense } from 'react'
import { Nprogress } from '@/components'

export function Loadable(Component: any) {
  return function L(props: Record<string, any> = {}) {
    return (
      <Suspense fallback={<Nprogress />}>
        <Component {...props} />
      </Suspense>
    )
  }
}
