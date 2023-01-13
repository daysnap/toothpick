import { LiHTMLAttributes, useMemo } from 'react'
import { Image } from 'antd'
import classnames from 'classnames'
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
  const { role } = item

  const content = useMemo(() => {
    const { contents, type } = item
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
  }, [item])

  if (!content) {
    return null
  }

  return (
    <li
      className={classnames(
        'mb-2 break-words flex ',
        {
          'animated fadeInLeft': role === Room.USER,
          'animated fadeInRight justify-end text-right': role === Room.BOSS,
        },
        className,
      )}
    >
      <div
        className={classnames('max-w-[80%] bg-white p-2 rounded', {
          'bg-primary/80': role === Room.BOSS,
        })}
      >
        {content}
      </div>
    </li>
  )
}
