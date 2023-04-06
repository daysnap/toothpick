import { Button, Row, Input, Form } from 'antd'
import { isLogin } from '@/plugins/storage'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

export default function LoginView() {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    const { name, password } = values
    if (name === 'admin' && password === '123456') {
      isLogin.setItem(+new Date())
      navigate('/')
    } else {
      message.error('账号或密码错误')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="absolute left-1/2 top-2/4 p-[36px] -ml-[160px] -mt-[160px] w-[320px] h-[320px] shadow-sm bg-white">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="flex justify-center items-center mb-3">
          <img src="https://mf.autostreets.com/bos/public/image/autostreets_logo.png" />
        </div>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input placeholder="密码" type="password" />
        </Form.Item>
        <Row className="flex justify-center items-center">
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Row>
      </Form>
    </div>
  )
}
