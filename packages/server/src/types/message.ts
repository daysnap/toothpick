export interface Message<T = any> {
  ids: string[]
  code: number
  data: T
}

export interface BossMessage<T = any> {
  ids: string[]
  code: number
  data: T
}
