import { useParams } from 'react-router-dom'
import {
  BugOutlined,
  CaretRightOutlined,
  ClearOutlined,
  PauseOutlined,
  ScissorOutlined,
} from '@ant-design/icons'
import { Tooltip, Button, Popconfirm } from 'antd'
import { ChangeEventHandler, useState } from 'react'
import { useSocketClientContext } from '@/components'
import {
  Room,
  SessionMessageType,
  useSessionContext,
} from '@/views/Session/SessionContext'

export function InputBox() {
  const { userId: id } = useParams<{ userId: string }>()
  const [content, setContent] = useState('')
  const handlerChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setContent(event.target.value)
  }

  const { setSessionMessages } = useSessionContext()
  const { socket } = useSocketClientContext()
  const handleDebug = () => {
    setSessionMessages((v) => [
      ...v,
      {
        role: Room.BOSS,
        contents: [content],
        type: SessionMessageType.TEXT,
      },
    ])
    socket.emit('boss:eval', { code: 0, data: { id, content } })
  }

  const handleScreenshot = () => {
    setSessionMessages((v) => [
      ...v,
      {
        role: Room.BOSS,
        contents: [
          `抓取用户屏幕${content ? '，抓取元素为：' + content + '。' : '。'}`,
        ],
        type: SessionMessageType.TEXT,
      },
    ])
    socket.emit('boss:screenshot', {
      code: 0,
      data: { id, selectors: content || 'body' },
    })
  }

  const [grab, setGrab] = useState(false)
  const handleGrab = () => {
    const v = !grab
    socket.emit(v ? 'boss:session' : 'boss:session exit', {
      code: 0,
      data: { id },
    })
    setGrab(v)
  }

  return (
    <div className="border-t border-gray-200 h-40 bg-white/80 flex flex-col">
      <div className="flex p-4">
        <Tooltip placement="topLeft" title={grab ? '暂停抓取' : '开始抓取'}>
          <Button
            onClick={handleGrab}
            className="mr-2"
            icon={grab ? <PauseOutlined /> : <CaretRightOutlined />}
          />
        </Tooltip>

        <Popconfirm
          placement="topLeft"
          title="温馨提示"
          description="确认清空面板？"
          onConfirm={() => setSessionMessages([])}
        >
          <Button className="mr-2" icon={<ClearOutlined />} />
        </Popconfirm>

        <Popconfirm
          placement="topLeft"
          title="温馨提示"
          description={`确认抓取用户屏幕？${
            content ? '抓取元素为：' + content + '。' : ''
          }`}
          onConfirm={handleScreenshot}
        >
          <Button className="mr-2" icon={<ScissorOutlined />} />
        </Popconfirm>

        <Tooltip title="执行代码">
          <Button
            onClick={handleDebug}
            disabled={!content}
            type="primary"
            icon={<BugOutlined />}
            className="ml-auto"
          />
        </Tooltip>
      </div>

      <div className="flex-1 pb-4">
        <textarea
          value={content}
          onChange={handlerChange}
          className="w-full h-full box-border outline-none resize-none px-4 text-[13px] bg-transparent"
          placeholder="请输入代码"
        />
      </div>
    </div>
  )
}
