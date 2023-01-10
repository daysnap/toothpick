import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()
const io = new Server(server)

io.on('connection', (client) => {
  client.on('event', (data) => {
    /* … */
    console.log('data => ', data)
  })
  client.on('disconnect', () => {
    /* … */
  })
})

server.listen(3000)

console.log(`socket 服务已启动`)
