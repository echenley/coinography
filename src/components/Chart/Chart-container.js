// @flow

import { connect, type Connector } from 'react-redux'
import { fetchChartData } from '../../actions'
import {
  getCandleChartData,
  getChartDataLoadingState,
  getChartType,
  getCurrency,
  getGranularity,
  getLineChartData,
} from '../../selectors'
import Chart, { type Props } from './Chart'
import type { State } from '../../types'

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

const connector: Connector<{}, Props> = connect(mapStateToProps, {
  fetchChartData,
})

export default connector(Chart)
