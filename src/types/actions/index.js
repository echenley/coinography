// @flow

import type {
  UpdateChartType,
  UpdateCurrency,
  UpdateGranularity,
} from './chart'

import type {
  FetchHistoricDataFailure,
  FetchHistoricDataLoading,
  FetchHistoricDataSuccess,
} from './gdax'

export type {
  UpdateChartType,
  UpdateCurrency,
  UpdateGranularity,
  FetchHistoricDataFailure,
  FetchHistoricDataLoading,
  FetchHistoricDataSuccess,
}

export type Action =
  | FetchHistoricDataFailure
  | FetchHistoricDataLoading
  | FetchHistoricDataSuccess
  | UpdateChartType
  | UpdateCurrency
  | UpdateGranularity
