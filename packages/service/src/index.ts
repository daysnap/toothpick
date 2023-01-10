import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()
const io = new Server(server)

io.on('connection', client => {
  client.on('event', data => { /* … */ })
  client.on('disconnect', () => { /* … */ })
})

server.listen(3000)

console.log(`服务已启动`)
