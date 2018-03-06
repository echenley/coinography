// @flow

import { connect } from 'react-redux'
import { fetchChartData } from '../../actions'
import {
  getCandleChartData,
  getChartDataLoadingState,
  getChartType,
  getCurrency,
  getGranularity,
  getLineChartData,
} from '../../selectors'
import Chart from './Chart'
import type { Currency, Granularity, Dispatch, State } from '../../types'

function mapStateToProps(state: State) {
  const chartType = getChartType(state)

  return {
    chartData:
      chartType === 'line'
        ? getLineChartData(state)
        : getCandleChartData(state),
    chartType,
    currency: getCurrency(state),
    granularity: getGranularity(state),
    loadingState: getChartDataLoadingState(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchChartData: (
      currency: Currency,
      granularity: Granularity,
      silent?: boolean
    ) => dispatch(fetchChartData(currency, granularity, silent)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
