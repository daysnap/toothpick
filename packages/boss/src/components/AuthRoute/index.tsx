// 路由鉴权
// 1. 判断是否登录
// 2. 如果登录 直接正常渲染
// 3. 如果未登录 重定向到登录路由

import { Navigate } from 'react-router-dom'
import { isLogin } from '@/plugins/storage'

function AuthRoute({ children }: any) {
  const loginTime = isLogin.getItem()
  // 是否过期
  const isExpire = loginTime
    ? +new Date() - loginTime > 24 * 60 * 60 * 1000
    : true
  if (!isExpire) {
    return <>{children}</>
  }
  // 如果过期，重定向到登录路由
  else {
    return <Navigate to="/login" replace />
  }
}
export { AuthRoute }
