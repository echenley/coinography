// @flow

import type { HistoricData } from '../gdax'

export type FetchHistoricDataLoading = {
  type: 'FETCH_HISTORIC_DATA_LOADING',
  requestId: number,
  silent: boolean,
}

export type FetchHistoricDataSuccess = {
  type: 'FETCH_HISTORIC_DATA_SUCCESS',
  data: HistoricData,
  requestId: number,
}

export type FetchHistoricDataFailure = {
  type: 'FETCH_HISTORIC_DATA_FAILURE',
  error: Object,
  requestId: number,
}
