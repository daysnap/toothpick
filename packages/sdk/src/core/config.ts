import { ManagerOptions, SocketOptions } from 'socket.io-client'

export interface Config {
  methodNames?: (keyof Console)[]
  socketConfig: Partial<ManagerOptions & SocketOptions> & { url: string }
}

export const config = {
  methodNames: Object.keys(console) as Config['methodNames'],
} as Required<Config>

export const defineConfig = (cfg: Partial<Config>) => {
  Object.assign(config, cfg)
}
