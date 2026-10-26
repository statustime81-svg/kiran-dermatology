import { createContext, useContext } from 'react'
export const SnapshotContext = createContext(null)
export const useSnapshot = () => useContext(SnapshotContext)
