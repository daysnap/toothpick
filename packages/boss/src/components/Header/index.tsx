import classnames from 'classnames'
import { HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'

export interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  title?: string
  useLeftArrow?: boolean
}

export function Header(props: HeaderProps) {
  const { title, className, useLeftArrow = true } = props
  const navigate = useNavigate()

  return (
    <header
      className={classnames(
        'relative sticky top-0 h-14 border-b border-gray-200 flex items-center justify-center z-10',
        className,
      )}
    >
      {useLeftArrow && (
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="absolute flex items-center justify-center left-0 top-0 bottom-0 w-14 cursor-pointer hover:bg-gray-100/50 transition-colors"
        >
          <i className="w-3 h-3 border-gray-400 border-b-2 border-l-2 rotate-45" />
        </button>
      )}

      <h1 className="font-bold">{title}</h1>
    </header>
  )
}
