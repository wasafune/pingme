import { CREATE_USER } from '../constants'

// Async
export const createUser = (user) => ({
  type: CREATE_USER,
  user,
})
