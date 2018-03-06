// @flow

import type { ChartType, Currency, Granularity } from '../chart'

export type UpdateChartType = {
  type: 'UPDATE_CHART_TYPE',
  chartType: ChartType,
}

export type UpdateCurrency = {
  type: 'UPDATE_CURRENCY',
  currency: Currency,
}

export type UpdateGranularity = {
  type: 'UPDATE_GRANULARITY',
  granularity: Granularity,
}
