import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { Header } from '@/components'
import { InputBox, ScreenBox } from './components'

export default function SessionView() {
  const params = useParams<{ userId: string }>()

  return (
    <div className="flex flex-col h-screen">
      <Header title={params.userId} />
      <div>
        <Button type="primary">xxxxxx</Button>
      </div>
      <ScreenBox />
      <InputBox />
    </div>
  )
}
