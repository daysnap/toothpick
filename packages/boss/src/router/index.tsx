import { HashRouter } from 'react-router-dom'
import { Routes } from './Routes'

export * from './Routes'
export * from './type'

export default function Router() {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  )
}
