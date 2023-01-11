import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

nprogress.configure({
  showSpinner: false,
})

export function Nprogress() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}
