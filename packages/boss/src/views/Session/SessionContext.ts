import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export enum Room {
  USER = 'user',
  BOSS = 'boss',
}

export interface SessionMessage {
  type: Room
  fn?: string
  contents: any[]
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
