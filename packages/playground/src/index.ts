import * as sdk from '@daysnap/toothpick-sdk'

sdk.init({
  methodNames: ['debug', 'dir'],
  socketConfig: {
    url: 'ws://localhost:3000',
  },
})

document.querySelector('#button')?.addEventListener('click', () => {
  const content = document.querySelector<HTMLInputElement>('#content')?.value
  console.dir('输出内容', content)
})
