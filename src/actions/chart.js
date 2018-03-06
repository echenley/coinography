// @flow

import axios, { type AxiosPromise } from 'axios'
import { GDAX_PRODUCTS } from '../constants'
import type {
  Dispatch,
  ChartType,
  Currency,
  HistoricData,
  Granularity,
} from '../types'

export function updateChartType(chartType: ChartType) {
  return {
    type: 'UPDATE_CHART_TYPE',
    chartType,
  }
}

export function updateCurrency(currency: Currency) {
  return {
    type: 'UPDATE_CURRENCY',
    currency,
  }
}

export function updateGranularity(granularity: Granularity) {
  return {
    type: 'UPDATE_GRANULARITY',
    granularity,
  }
}

// track requestId to avoid race conditions
let rId = 0

export function fetchChartData(
  currency: Currency,
  granularity: Granularity,
  silent?: boolean = false
) {
  const requestId = ++rId

  return (dispatch: Dispatch): AxiosPromise<HistoricData> => {
    dispatch({
      type: 'FETCH_HISTORIC_DATA_LOADING',
      requestId,
      silent,
    })

    return axios
      .get(`${GDAX_PRODUCTS}/${currency}/candles?granularity=${granularity}`)
      .then(
        (response) => {
          dispatch({
            type: 'FETCH_HISTORIC_DATA_SUCCESS',
            data: response.data,
            requestId,
          })

          return response
        },
        error => {
          dispatch({
            type: 'FETCH_HISTORIC_DATA_FAILURE',
            error,
            requestId,
          })

          throw error
        }
      )
  }
}
