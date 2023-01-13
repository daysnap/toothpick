import { LiHTMLAttributes, useMemo } from 'react'
import { Image, message } from 'antd'
import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import {
  Room,
  SessionMessage,
  SessionMessageType,
} from '@/views/Session/SessionContext'
import { filterCRLF, isObject, isString } from '@daysnap/utils'

export interface ScreenItemProps extends LiHTMLAttributes<HTMLLIElement> {
  item: SessionMessage
}

export function ScreenItem(props: ScreenItemProps) {
  const { className, item } = props
  const { role, type, contents, fn } = item

  const content = useMemo(() => {
    if (type === SessionMessageType.IMG) {
      return contents.map((base64, index) => (
        <Image
          className="max-w-[200px] w-full"
          src={base64}
          key={index}
          alt="截图"
        />
      ))
    }
    if (type === SessionMessageType.TEXT) {
      return contents.map((item, index) => {
        if (isString(item)) {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: filterCRLF(item) }}
            />
          )
        }
        if (isObject(item)) {
          return <p key={index}>{JSON.stringify(item)}</p>
        }
        return <p key={index}>{`${item}`}</p>
      })
    }
    return null
  }, [contents, type])

  const handleCopy = () => {
    if (type === SessionMessageType.TEXT && copy(JSON.stringify(contents))) {
      return message.success({ content: '复制成功' })
    }
  }

  if (!content) {
    return null
  }

  return (
    <li
      className={classnames(
        'mb-2 break-words flex',
        {
          'animated fadeInLeft': role === Room.USER,
          'animated fadeInRight justify-end text-right': role === Room.BOSS,
        },
        className,
      )}
    >
      <div
        onClick={handleCopy}
        className={classnames('max-w-[80%] bg-white p-2 rounded', {
          'bg-primary/80': role === Room.BOSS,
          'bg-white': role === Room.USER && fn !== 'error',
          'bg-red-200': role === Room.USER && fn === 'error',
        })}
      >
        {content}
      </div>
    </li>
  )
}
