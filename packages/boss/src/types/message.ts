export interface Message<T = any> {
  ids: string[]
  code: number
  data: T
}
