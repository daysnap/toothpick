import classnames from 'classnames'
import { HTMLAttributes } from 'react'

export interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  title?: string
}

export function Header(props: HeaderProps) {
  const { title, className } = props
  return (
    <header
      className={classnames(
        'sticky top-0 h-16 border-b border-gray-200 flex items-center justify-center z-10',
        className,
      )}
    >
      <h1 className="font-bold">{title}</h1>
    </header>
  )
}
