import { useSessionContext } from '@/views/Session/SessionContext'
import { useRef } from 'react'
import { useAutoScrollBottom } from './useAutoScrollBottom'

export function ScreenBox() {
  const { sessionMessages } = useSessionContext()

  const containerRef = useRef<HTMLDivElement>(null)
  useAutoScrollBottom(containerRef, [sessionMessages])

  return (
    <div className="flex-1 overflow-y-auto" ref={containerRef}>
      <ul className="p-4 text-[12px]">
        {sessionMessages.map((item, index) => {
          return (
            <li className="mb-2 animated fadeInLeft break-words" key={index}>
              <p>fn: {item.fn}</p>
              <p>contents: {item.contents.join('')}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
