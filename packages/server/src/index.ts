// import http from 'http'
import { Server } from 'socket.io'

// const server = http.createServer(app.callback())

const io = new Server(12580, {
  cors: {
    origin: '*',
  },
})

let clients: any[] = []

const bossClients: any[] = []
const userClients: any[] = []

io.on('connection', (client) => {
  client.on('event', (data) => {
    /* … */
    console.log('event => ', data)
    client.emit('messages', {
      content: '哈哈哈',
      eval: `
      console.log(window);
      window.test().then(res => socket.emit('eval', res));
      sessionStorage.setItem('HB', '110');
      socket.emit('eval', { x: document.body.innerHTML });
    `,
    })
  })
  client.on('eval', (data) => {
    console.log('eval => ', data)
  })

  client.on('info', (data: { type: 'boss' | 'user'; id: string }) => {
    if (data.type === 'boss') {
      bossClients.push({ client, ...data })
    }
    if (data.type === 'user') {
      const user = { client, ...data }
      userClients.push(user)

      bossClients.forEach((item) => {
        item.client.emit('users', userClients)
      })
    }
  })

  client.on('disconnect', (data) => {
    /* … */
    console.log('disconnect', data)
  })
  client.on('disconnecting', () => {
    clients = clients.filter((item) => item !== client)
  })
})

// server.listen(3000)

console.log(`socket 服务已启动`)
