import * as sdk from '@daysnap/toothpick-sdk'

sdk.init({
  socketConfig: {
    url: 'ws://10.50.101.114:12580',
  },
})
;(window as any).test = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000, { content: '异步函数执行的结果' })
  })

document.querySelector('#button')?.addEventListener('click', () => {
  let content =
    document.querySelector<HTMLInputElement>('#content')?.value ?? ''

  try {
    content = JSON.parse(content)
  } catch {
    //
  }

  console.log(content)
})
