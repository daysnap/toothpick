import { BugOutlined, ScissorOutlined } from '@ant-design/icons'
import { Tooltip, Button } from 'antd'

export function InputBox() {
  return (
    <div className="border-t border-gray-200 h-40 bg-white/80 flex flex-col">
      <div className="flex p-4">
        <Tooltip title="获取截图">
          <Button icon={<ScissorOutlined />} />
        </Tooltip>

        <Tooltip title="执行代码">
          <Button type="primary" icon={<BugOutlined />} className="ml-auto" />
        </Tooltip>
      </div>
      <div className="flex-1 pb-4">
        <textarea
          className="w-full h-full box-border outline-none resize-none px-4 text-[13px]"
          placeholder="请输入代码"
        />
      </div>
    </div>
  )
}
