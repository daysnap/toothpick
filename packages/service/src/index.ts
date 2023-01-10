import http from 'http'
import { Server } from 'socket.io'
import Koa from 'koa'

const app = new Koa()
const server = http.createServer(app.callback())
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

let clients: any[] = []

app.use((ctx) => {
  console.log('req => ', ctx)
  ctx.res.end('111')
})

io.on('connection', (client) => {
  client.on('event', (data) => {
    /* … */
    console.log('event => ', data)
    client.emit('messages', {
      content: '哈哈哈',
      eval: `
      sessionStorage.setItem('HB', '110');
      socket.emit('eval', { x: document.body.innerHTML });
    `,
    })
  })
  client.on('eval', (data) => {
    console.log('eval => ', data)
  })
  client.on('disconnect', (data) => {
    /* … */
    console.log('disconnect', data)
  })
  client.on('disconnecting', () => {
    clients = clients.filter((item) => item !== client)
  })
})

server.listen(3000)

console.log(`socket 服务已启动`)
