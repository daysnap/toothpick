import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export enum Room {
  USER = 'user',
  BOSS = 'boss',
}

export enum SessionMessageType {
  IMG = 'img',
  TEXT = 'text',
}

export interface SessionMessage {
  role: Room
  fn?: string
  contents: any[]
  type: SessionMessageType
}

export interface SessionContextValue {
  sessionMessages: SessionMessage[]
  setSessionMessages: Dispatch<SetStateAction<SessionMessage[]>>
}

export const SessionContext = createContext<SessionContextValue>(
  {} as SessionContextValue,
)

export const useSessionContext = () => {
  return useContext(SessionContext)
}
