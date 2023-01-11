import { Link } from 'react-router-dom'
import { Header } from '@/components'
import { useSocketClientContext } from '@/components'

export default function HomeView() {
  const { users } = useSocketClientContext()

  return (
    <div>
      <Header title="Toothpick" />
      <div>
        {users.map((user) => (
          <Link
            className="flex items-center p-5 border-b border-gray-100 text-[14px] text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-primary/10 transition-colors"
            key={user.id}
            to={`/session/${user.id}`}
          >
            用户<strong>（{user.id}）</strong>
            <i className="w-2 h-2 border-gray-400 border-t-2 border-r-2 rotate-45 ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  )
}
