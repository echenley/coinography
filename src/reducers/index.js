// @flow

import { combineReducers } from 'redux'
import chart, { type State as ChartState } from './chart'

export type State = {
  chart: ChartState,
}

export default combineReducers({
  chart,
  // ...additional reducers
})
