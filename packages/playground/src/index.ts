import * as sdk from '@daysnap/toothpick-sdk'

sdk.init({
  methodNames: ['debug', 'dir'],
  socketConfig: {
    url: 'ws://localhost:12580',
  },
})
;(window as any).test = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000, { content: '异步函数执行的结果' })
  })

document.querySelector('#button')?.addEventListener('click', () => {
  const content = document.querySelector<HTMLInputElement>('#content')?.value
  console.dir('输出内容', content)
})
