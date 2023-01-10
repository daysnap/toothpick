import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()
const io = new Server(server)

io.on('connection', (client) => {
  client.on('event', (data) => {
    /* … */
    console.log('event => ', data)
  })
  client.on('disconnect', (data) => {
    /* … */
    console.log('disconnect', data)
  })
})

server.listen(3000)

console.log(`socket 服务已启动`)
