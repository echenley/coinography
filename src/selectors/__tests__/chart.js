import {
  getChartType,
  getCurrency,
  getGranularity,
  getRawChartData,
  getChartDataLoadingState,
  getCandleChartData,
  getLineChartData,
} from '../chart'

const emptyState = {
  chart: {
    currency: 'BTC-USD',
    data: null,
    granularity: 300,
    loadingState: 'loading',
    requestId: 1,
    type: 'candle',
  },
}

const state = {
  chart: {
    currency: 'BTC-USD',
    data: [
      [1520120700, 11408.47, 11433, 11419, 11433, 6.950522849999999],
      [1520120400, 11402.09, 11432.5, 11431.99, 11418.99, 16.592416949999997],
      [1520120100, 11423.98, 11437, 11423.99, 11432, 8.08159502],
      [1520119800, 11417, 11472.99, 11472.99, 11423.99, 14.742709310000002],
      [1520119500, 11407.15, 11469, 11407.16, 11451.85, 32.78077041000002],
      [1520119200, 11375.93, 11407.16, 11375.94, 11407.16, 32.09318542999999],
      [1520118900, 11365.67, 11375.94, 11365.67, 11375.94, 8.343350529999997],
      [1520118600, 11365.67, 11375.01, 11375.01, 11365.68, 7.895380060000002],
      [1520118300, 11374.99, 11380, 11375, 11375, 9.742431200000002],
      [1520118000, 11374.99, 11375, 11375, 11375, 13.58678584],
    ],
    granularity: 300,
    loadingState: 'success',
    requestId: 1,
    type: 'candle',
  },
}

describe('getChartType', () => {
  it('returns getChartType', () => {
    expect(getChartType(state)).toBe('candle')
  })
})

describe('getCurrency', () => {
  it('returns getCurrency', () => {
    expect(getCurrency(state)).toBe('BTC-USD')
  })
})

describe('getGranularity', () => {
  it('returns getGranularity', () => {
    expect(getGranularity(state)).toBe(300)
  })
})

describe('getRawChartData', () => {
  it('returns getRawChartData', () => {
    expect(getRawChartData(state)).toBe(state.chart.data)
  })
})

describe('getChartDataLoadingState', () => {
  it('returns getChartDataLoadingState', () => {
    expect(getChartDataLoadingState(state)).toBe('success')
  })
})

describe('getCandleChartData', () => {
  it('returns candle chart data', () => {
    expect(getCandleChartData(state, 5)).toMatchSnapshot()
  })

  it('uses default limit of 30 if not provided', () => {
    expect(getCandleChartData(state)).toHaveLength(state.chart.data.length)
  })

  it('returns null if no data', () => {
    expect(getCandleChartData(emptyState, 5)).toBe(null)
  })
})

describe('getLineChartData', () => {
  it('returns line chart data', () => {
    expect(getLineChartData(state, 5)).toMatchSnapshot()
  })

  it('uses default limit of 30 if not provided', () => {
    expect(getLineChartData(state)).toHaveLength(state.chart.data.length)
  })

  it('returns null if no data', () => {
    expect(getLineChartData(emptyState, 5)).toBe(null)
  })
})
