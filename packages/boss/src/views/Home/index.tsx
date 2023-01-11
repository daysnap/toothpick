import { useSocketClientContext } from '@/components/SocketClient/socket-client-context'

export default function HomeView() {
  const { users } = useSocketClientContext()

  return (
    <div>
      首页
      <ul>
        {users.map((user) => (
          <li key={user.id}>客户端：{user.id}</li>
        ))}
      </ul>
    </div>
  )
}
