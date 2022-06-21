import { request } from 'src'

interface Data {
  list: []
}

describe(`basics request`, () => {

  it('should request data tips', () => {

    request({
      url: 'https://www.baidu.com',
    }).then((res) => {
      (res as Data).list
    })
    //
    request<Data, { url: string }>({
      url: 'https://www.baidu.com',
    }).then((res) => {
      res.list
    })

  })

})
