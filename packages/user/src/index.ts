import * as sdk from '@daysnap/toothpick-sdk'

const { hostname } = location
let url = `ws://${hostname}:12580`
if (hostname === 'demo.daysnap.cn') {
  url = 'ws://119.3.156.101:12580'
} else if (hostname === 'localhost') {
  url = 'ws://localhost:12580'
}

sdk.init({
  socketConfig: {
    url,
  },
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
