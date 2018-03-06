// @flow

import type {
  Action,
  ChartType,
  Currency,
  Granularity,
  HistoricData,
  LoadingState,
} from '../types'

export type State = {
  currency: Currency,
  granularity: Granularity,
  type: ChartType,
  data: ?HistoricData,
  loadingState: LoadingState,
  requestId: ?number,
}

const initialState = {
  currency: 'BTC-USD',
  data: null,
  granularity: 300,
  loadingState: 'loading',
  requestId: null,
  type: 'candle',
}

export default function chart(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'FETCH_HISTORIC_DATA_LOADING':
      return {
        ...state,
        loadingState: action.silent ? state.loadingState : 'loading',
        requestId: action.requestId,
      }
    case 'FETCH_HISTORIC_DATA_FAILURE':
      // check requestId to ensure only the most recent request gets through
      if (state.requestId !== action.requestId) {
        return state
      }

      return {
        ...state,
        loadingState: 'failure',
      }
    case 'FETCH_HISTORIC_DATA_SUCCESS':
      if (state.requestId !== action.requestId) {
        return state
      }

      return {
        ...state,
        data: action.data,
        loadingState: 'success',
      }
    case 'UPDATE_CHART_TYPE':
      return { ...state, type: action.chartType }
    case 'UPDATE_CURRENCY':
      return { ...state, currency: action.currency }
    case 'UPDATE_GRANULARITY':
      return { ...state, granularity: action.granularity }
    default:
      return state
  }
}
