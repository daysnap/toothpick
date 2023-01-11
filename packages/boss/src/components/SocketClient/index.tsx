import {
  SocketClientContext,
  SocketClientContextValue,
} from './socket-client-context'
import { ReactElement, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message } from '@/types'

export * from './socket-client-context'

export interface SocketClientProps {
  children: ReactElement
}

const socket = io('ws://localhost:12580')

socket.emit('boss:join')

export function SocketClient(props: SocketClientProps) {
  const { children } = props
  const [users, setUsers] = useState<Socket[]>([])

  const socketClientContextValue = useMemo<SocketClientContextValue>(() => {
    socket.on('boss:message', (message: Message) => {
      console.log(`boss:message => `, message)
    })

    socket.on('boss:user exit', (message: Message) => {
      // const { user, reason } = message.data
      console.log(`boss:user exit => `, message)
    })

    socket.on('boss:users', (message: Message) => {
      console.log(`boss:users => `, message)
      setUsers(message.data)
    })

    return { socket, users }
  }, [users])

  return (
    <SocketClientContext.Provider value={socketClientContextValue}>
      {children}
    </SocketClientContext.Provider>
  )
}
