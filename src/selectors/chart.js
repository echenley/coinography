// @flow

import { createSelector } from 'reselect'
import type { State } from '../types'

export const getChartType = (state: State) => state.chart.type
export const getCurrency = (state: State) => state.chart.currency
export const getGranularity = (state: State) => state.chart.granularity
export const getRawChartData = (state: State) => state.chart.data
export const getChartDataLoadingState = (state: State) => {
  return state.chart.loadingState
}

export const getCandleChartData = createSelector(
  getRawChartData,
  (state: State, limit?: number = 30) => limit,
  (data, limit) => {
    if (!data) {
      return null
    }

    return data
      .slice(0, limit)
      .reverse()
      .map(dataPoint => ({
        // time returned from gdax api is in seconds
        x: new Date(dataPoint[0] * 1000),
        open: dataPoint[3],
        close: dataPoint[4],
        high: dataPoint[2],
        low: dataPoint[1],
      }))
  }
)

export const getLineChartData = createSelector(
  getRawChartData,
  (state: State, limit?: number = 30) => limit,
  (data, limit) => {
    if (!data) {
      return null
    }

    return data
      .slice(0, limit)
      .reverse()
      .map(dataPoint => ({
        x: new Date(dataPoint[0] * 1000),
        y: dataPoint[4],
      }))
  }
)
