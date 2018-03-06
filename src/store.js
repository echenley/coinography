// @flow

import { Platform } from 'react-native'
import {
  createStore,
  applyMiddleware,
  compose,
  type StoreEnhancer,
} from 'redux'
import devTools from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from './reducers'
import type { State, Action, Dispatch } from './types'

const middleware = applyMiddleware(thunk)

const storeEnhancer: StoreEnhancer<State, Action, Dispatch> = compose(
  middleware,
  devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678,
  })
)

export default createStore(reducer, storeEnhancer)
