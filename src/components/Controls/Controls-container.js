// @flow

import { connect, type Connector } from 'react-redux'
import { updateChartType, updateCurrency, updateGranularity } from '../../actions'
import { getChartType, getCurrency, getGranularity } from '../../selectors'
import Controls, { type Props } from './Controls'
import type { State } from '../../types'

function mapStateToProps(state: State): * {
  return {
    chartType: getChartType(state),
    currency: getCurrency(state),
    granularity: getGranularity(state),
  }
}

const connector: Connector<{}, Props> = connect(mapStateToProps, {
  updateChartType,
  updateCurrency,
  updateGranularity,
})
export default connector(Controls)
