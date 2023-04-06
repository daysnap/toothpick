import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, useSocketClientContext, AuthRoute } from '@/components'
import { InputBox, ScreenBox } from './components'
import {
  Room,
  SessionContext,
  SessionMessage,
  SessionMessageType,
} from './SessionContext'
import { Message } from '@/types'

export default function SessionView() {
  const { userId: id } = useParams<{ userId: string }>()
  const { socket } = useSocketClientContext()

  useEffect(() => {
    // socket.emit('boss:session', { code: 0, data: { id } })
    return () => {
      socket.emit('boss:session exit', { code: 0, data: { id } })
    }
  }, [id, socket])

  const [sessionMessages, setSessionMessages] = useState<SessionMessage[]>([])
  const sessionContextValue = useMemo(
    () => ({
      sessionMessages,
      setSessionMessages,
    }),
    [sessionMessages],
  )

  useEffect(() => {
    socket.on(
      'boss:message',
      (
        message: Message<{
          fn: string
          contents: any[]
        }>,
      ) => {
        const { fn, contents } = message.data
        setSessionMessages((v) => [
          ...v,
          { fn, contents, role: Room.USER, type: SessionMessageType.TEXT },
        ])
      },
    )
  }, [socket, setSessionMessages])

  useEffect(() => {
    socket.on(
      'boss:screenshot',
      (
        message: Message<{
          base64: string
        }>,
      ) => {
        const { base64 } = message.data
        setSessionMessages((v) => [
          ...v,
          { contents: [base64], role: Room.USER, type: SessionMessageType.IMG },
        ])
      },
    )
  }, [socket, setSessionMessages])

  return (
    <AuthRoute>
      <SessionContext.Provider value={sessionContextValue}>
        <div className="flex flex-col h-screen">
          <Header title={id} />
          <ScreenBox />
          <InputBox />
        </div>
      </SessionContext.Provider>
    </AuthRoute>
  )
}
