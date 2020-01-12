import { createContext } from 'react'
import { USER_TYPE } from '../utils/types'

const UserContext = createContext<USER_TYPE>({})

export default UserContext
