import { useSessionContext } from '@/views/Session/SessionContext'
import { useRef } from 'react'
import { useAutoScrollBottom } from './useAutoScrollBottom'
import { ScreenItem } from './ScreenItem'

export function ScreenBox() {
  const { sessionMessages } = useSessionContext()

  const containerRef = useRef<HTMLDivElement>(null)
  useAutoScrollBottom(containerRef, [sessionMessages])

  return (
    <div
      className="flex-1 overflow-y-auto overflow-x-hidden"
      ref={containerRef}
    >
      <ul className="p-4 text-[12px]">
        {sessionMessages.map((item, index) => {
          return <ScreenItem item={item} key={index} />
        })}
      </ul>
    </div>
  )
}
