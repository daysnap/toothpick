export interface Config {
  methodNames: (keyof Console)[]
}

export const config: Config = {
  methodNames: Object.keys(console) as Config['methodNames'],
}

export const defineConfig = (cfg?: Partial<Config>) => {
  Object.assign(config, cfg)
}
