
import { request } from 'src'

describe(`basics-request`, () => {

  it('should ', () => {
    request({
      url: 'https://www.baidu.com'
    }).then(res => {
      res.data
    }).catch()
  })

})
