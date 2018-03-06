// @flow

import { connect } from 'react-redux'
import { updateChartType, updateCurrency, updateGranularity } from '../../actions'
import { getChartType, getCurrency, getGranularity } from '../../selectors'
import Controls from './Controls'
import type { State } from '../../types'

function mapStateToProps(state: State): * {
  return {
    chartType: getChartType(state),
    currency: getCurrency(state),
    granularity: getGranularity(state),
  }
}

export default connect(mapStateToProps, {
  updateChartType,
  updateCurrency,
  updateGranularity,
})(Controls)
