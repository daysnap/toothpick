import { useParams } from 'react-router-dom'
import { BugOutlined, ScissorOutlined } from '@ant-design/icons'
import { Tooltip, Button } from 'antd'
import { ChangeEventHandler, useState } from 'react'
import { useSocketClientContext } from '@/components'

export function InputBox() {
  const { userId: id } = useParams<{ userId: string }>()
  const [content, setContent] = useState('')
  const handlerChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setContent(event.target.value)
  }

  const { socket } = useSocketClientContext()
  const handleDebug = () => {
    socket.emit('boss:eval', { code: 0, data: { id, content } })
  }

  return (
    <div className="border-t border-gray-200 h-40 bg-white/80 flex flex-col">
      <div className="flex p-4">
        <Tooltip title="获取截图">
          <Button icon={<ScissorOutlined />} />
        </Tooltip>

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
          className="w-full h-full box-border outline-none resize-none px-4 text-[13px]"
          placeholder="请输入代码"
        />
      </div>
    </div>
  )
}
