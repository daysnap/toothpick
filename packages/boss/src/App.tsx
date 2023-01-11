import classnames from 'classnames'
import Router from '@/router'
import { SocketClient } from '@/components'
import classes from './index.module.scss'

export default function App() {
  return (
    <SocketClient>
      <div
        className={classnames(
          'fixed -z-50 top-[-50px] right-[-600px] h-[1000px] w-[1000px] rounded-full',
          classes.decorator1,
        )}
      />
      <div
        className={classnames(
          'fixed -z-50 top-[-200px] left-[-600px] h-[1000px] w-[1000px] rounded-full',
          classes.decorator2,
        )}
      />
      <div className="relative box-border mx-auto min-h-screen max-w-[768px] bg-gray-300/10">
        <Router />
      </div>
    </SocketClient>
  )
}
