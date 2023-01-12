import { ArrowLeftOutlined } from '@ant-design/icons'
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
        <span
          onClick={() => navigate(-1)}
          className="absolute flex items-center justify-center left-0 top-0 bottom-0 w-14 cursor-pointer hover:bg-gray-100/50 transition-colors text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftOutlined />
        </span>
      )}

      <h1 className="font-bold">{title}</h1>
    </header>
  )
}
