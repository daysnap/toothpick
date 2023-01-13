import {
  useCallback,
  useEffect,
  useRef,
  RefObject,
  DependencyList,
} from 'react'

export function useAutoScrollBottom(
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList,
) {
  const disabledAutoScrollRef = useRef(false)
  const autoScrollRef = useRef(false)

  useEffect(() => {
    const handler: EventListenerOrEventListenerObject = (event) => {
      if (autoScrollRef.current) {
        return
      }
      const { scrollHeight, scrollTop, clientHeight } =
        (event.target as any).scrollingElement || event.target
      const diff = Math.abs(scrollHeight - scrollTop - clientHeight)
      disabledAutoScrollRef.current = diff >= 3
    }
    const element = ref.current
    element?.addEventListener('scroll', handler)
    return () => {
      element?.removeEventListener('scroll', handler)
    }
  }, [ref])

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      autoScrollRef.current = true
      const { scrollHeight } = ref.current
      ref.current.scrollTop = scrollHeight
      autoScrollRef.current = false
    }
  }, [ref])

  useEffect(() => {
    if (!disabledAutoScrollRef.current) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, scrollToBottom])

  return {}
}
