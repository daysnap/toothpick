import { useSessionContext } from '@/views/Session/SessionContext'

export function ScreenBox() {
  const { sessionMessages } = useSessionContext()

  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="p-4 text-[12px]">
        {sessionMessages.map((item, index) => {
          return (
            <li className="mb-2" key={index}>
              <p>fn: {item.fn}</p>
              <p>contents: {item.contents.join('')}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
