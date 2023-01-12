import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { Header, useSocketClientContext } from '@/components'
import { InputBox, ScreenBox } from './components'
import { useEffect } from 'react'

export default function SessionView() {
  const { userId: id } = useParams<{ userId: string }>()
  const { socket } = useSocketClientContext()

  useEffect(() => {
    socket.emit('boss:session', { code: 0, data: { id } })
    return () => {
      socket.emit('boss:session exit', { code: 0, data: { id } })
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Header title={id} />
      <div>
        <Button type="primary">xxxxxx</Button>
      </div>
      <ScreenBox />
      <InputBox />
    </div>
  )
}
