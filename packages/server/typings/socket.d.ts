import 'socket.io'

declare module 'socket.io' {
  export declare class Socket {
    type: string
  }
}
