import { Server } from 'socket.io'
import http from 'http'
import * as handlers from './handlers'

const PORT = 12580
const server = http.createServer((req, res) => {
  res.end('Toothpick Server running...')
})

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) =>
  Object.values(handlers).forEach((handler) => handler(io, socket)),
)

server.listen(PORT, () => {
  console.log(`SOCKET 服务已启动，端口号 => ${PORT}`)
})
