
import { bootstrap } from 'src'

describe(`basics bootstrap`, () => {

  it(`should bootstrap`, () => {

    bootstrap().then(() => {
      console.log('启动成功')
    })

    bootstrap({
      success: () => console.log('启动成功')
    })

  })

})
