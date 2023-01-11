import {
  SocketClientContext,
  SocketClientContextValue,
} from './socket-client-context'
import { ReactElement, useMemo } from 'react'
import { io } from 'socket.io-client'

export interface SocketClientProps {
  children: ReactElement
}

export function SocketClient(props: SocketClientProps) {
  const { children } = props

  const socketClientContextValue = useMemo<SocketClientContextValue>(() => {
    const socket = io('wx://localhost:12580')

    return { socket }
  }, [])

  return (
    <SocketClientContext.Provider value={socketClientContextValue}>
      {children}
    </SocketClientContext.Provider>
  )
}
