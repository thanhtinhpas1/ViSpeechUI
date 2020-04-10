import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import userReducer from './user/user.reducers'
import tokenReducer from './token/token.reducers'
import orderReducer from './order/order.reducers'
import projectReducer from './project/project.reducers'
import permissionReducer from './permission/permission.reducers'
import reportReducer from './report/report.reducers'

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: [
    'currentUser', // save only currentUser to storage
  ],
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  token: tokenReducer,
  order: orderReducer,
  project: projectReducer,
  permission: permissionReducer,
  report: reportReducer,
})

export default rootReducer