import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, NoData, AuthRoute } from '@/components'
import { useSocketClientContext } from '@/components'
import { RightOutlined } from '@ant-design/icons'

export default function HomeView() {
  const { users, socket } = useSocketClientContext()

  useEffect(() => {
    socket.emit('boss:refresh')
  }, [socket])

  return (
    <AuthRoute>
      <div className="flex flex-col h-screen">
        <Header useLeftArrow={false} title="Toothpick" />
        <div className="flex-1">
          {!users.length && <NoData />}
          {users.map((user) => (
            <Link
              className="flex items-center p-5 border-b border-gray-100 text-[14px] text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-primary/10 transition-colors"
              key={user.id}
              to={`/session/${user.id}`}
            >
              用户<strong>（{user.id}）</strong>
              <RightOutlined className="ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </AuthRoute>
  )
}
