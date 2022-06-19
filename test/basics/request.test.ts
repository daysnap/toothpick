import { call, request, Services } from 'src'

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

    request<Data, { url: string }>({
      url: 'https://www.baidu.com',
    }).then((res) => {
      res.list
    })
  })

  it('should call data tips', () => {
    call<{ service: any, action: string }, { success: (res: Data) => {} }>({
      service: Services.BASICS,
      action: '222',
    }).then((res) => {
      res.list
    })
  })

})
