import Router from '@/router'
import { SocketClient } from '@/components'

export default function App() {
  return (
    <SocketClient>
      <Router />
    </SocketClient>
  )
}
