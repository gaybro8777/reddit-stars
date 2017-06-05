import { combineReducers } from 'redux'
import posts from './modules/posts'
import user from './modules/user'

const rootReducer = combineReducers({
  posts,
  user
})

export default rootReducer
