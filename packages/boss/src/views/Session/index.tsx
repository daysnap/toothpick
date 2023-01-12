import { useParams } from 'react-router-dom'
import { Header } from '@/components'
import { InputBox, ScreenBox } from './components'

export default function SessionView() {
  const params = useParams<{ userId: string }>()

  console.log('params => ', params)

  return (
    <div className="flex flex-col h-screen">
      <Header title={params.userId} />
      <ScreenBox />
      <InputBox />
    </div>
  )
}
