// import { Server, Socket } from 'socket.io'
// import Koa from 'koa'
//
// new Koa()
//
// const io = new Server(12580, {
//   cors: {
//     origin: '*',
//   },
// })
//
// const bossClients: Socket[] = []
// const userClients: Socket[] = []
//
// io.on('connection', (socket) => {
//   socket.on('event', (data) => {
//     /* … */
//     console.log('event => ', data)
//     socket.emit('messages', {
//       content: '哈哈哈',
//       eval: `
//       console.log(window);
//       window.test().then(res => socket.emit('eval', res));
//       sessionStorage.setItem('HB', '110');
//       socket.emit('eval', { x: document.body.innerHTML });
//     `,
//     })
//   })
//   socket.on('eval', (data) => {
//     console.log('eval => ', data)
//   })
//
//   socket.on('info', (data: { type: 'boss' | 'user'; id: string }) => {
//     if (data.type === 'boss') {
//       bossClients.push({ client, ...data })
//     }
//     if (data.type === 'user') {
//       const user = { client, ...data }
//       userClients.push(user)
//
//       bossClients.forEach((item) => {
//         item.client.emit('users', userClients)
//       })
//     }
//   })
//
//   socket.on('disconnect', (data) => {
//     /* … */
//     console.log('disconnect', data)
//   })
//   socket.on('disconnecting', () => {
//     clients = clients.filter((item) => item !== client)
//   })
// })
//
// console.log(`socket 服务已启动`)
