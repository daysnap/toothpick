import {
  SocketClientContext,
  SocketClientContextValue,
} from './socket-client-context'
import { ReactElement, useMemo, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Message } from '@/types'
import { socket } from './socket'

export * from './socket-client-context'

export interface SocketClientProps {
  children: ReactElement | ReactElement[]
}

export function SocketClient(props: SocketClientProps) {
  const { children } = props
  const [users, setUsers] = useState<Socket[]>([])

  const socketClientContextValue = useMemo<SocketClientContextValue>(() => {
    socket.on('boss:users', (message: Message<Socket[]>) => {
      setUsers(message.data.reverse())
    })

    return { socket, users }
  }, [users])

  return (
    <SocketClientContext.Provider value={socketClientContextValue}>
      {children}
    </SocketClientContext.Provider>
  )
}
