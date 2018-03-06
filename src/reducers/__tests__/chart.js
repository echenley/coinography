import chartReducer from '../chart'

const data = [
  [1520110800, 11259.7, 11293.58, 11273.18, 11260.79, 20.929171180000008],
  [1520110500, 11248.99, 11300.43, 11248.99, 11273.18, 29.644797649999997],
  [1520110200, 11233.58, 11251, 11237.93, 11248.99, 23.785362620000004],
  [1520109900, 11218.71, 11299.31, 11299.3, 11237.99, 43.71891207999998],
  [1520109600, 11271.28, 11315, 11290, 11299.3, 26.03891608000001],
]

const initialState = chartReducer(undefined, {})

describe('chart reducer', () => {
  it('returns correct initialState', () => {
    expect(initialState).toMatchSnapshot()
  })

  it('updates loadingState and requestId on FETCH_HISTORIC_DATA_LOADING', () => {
    expect(
      chartReducer(initialState, {
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 1,
      })
    ).toMatchSnapshot()
  })

  it('updates only requestId on FETCH_HISTORIC_DATA_LOADING when action.silent === true', () => {
    expect(
      chartReducer(
        {
          ...initialState,
          data,
          loadingState: 'success',
        },
        {
          type: 'FETCH_HISTORIC_DATA_LOADING',
          requestId: 2,
          silent: true,
        }
      ).loadingState
    ).toBe('success')
  })

  describe('FETCH_HISTORIC_DATA_FAILURE', () => {
    it('skips action if requestId does not match', () => {
      const state = chartReducer(initialState, {
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 2,
        silent: false,
      })

      expect(
        chartReducer(state, {
          type: 'FETCH_HISTORIC_DATA_FAILURE',
          error: {},
          requestId: 1,
        })
      ).toBe(state)
    })

    it('updates loadingState if requestId matches', () => {
      const state = chartReducer(initialState, {
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 2,
        silent: false,
      })

      expect(
        chartReducer(state, {
          type: 'FETCH_HISTORIC_DATA_FAILURE',
          error: {},
          requestId: 2,
        })
      ).toMatchSnapshot()
    })
  })

  describe('FETCH_HISTORIC_DATA_SUCCESS', () => {
    it('skips action if requestId does not match', () => {
      const state = chartReducer(initialState, {
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 2,
        silent: false,
      })

      expect(
        chartReducer(state, {
          type: 'FETCH_HISTORIC_DATA_SUCCESS',
          data,
          requestId: 1,
        })
      ).toBe(state)
    })

    it('updates data and loadingState if requestId matches', () => {
      const state = chartReducer(initialState, {
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 2,
        silent: false,
      })

      expect(
        chartReducer(state, {
          type: 'FETCH_HISTORIC_DATA_SUCCESS',
          data,
          requestId: 2,
        })
      ).toMatchSnapshot()
    })
  })

  it('updates chart type on UPDATE_CHART_TYPE', () => {
    expect(
      chartReducer(initialState, {
        type: 'UPDATE_CHART_TYPE',
        chartType: 'line',
      })
    ).toMatchSnapshot()
  })

  it('updates currency on UPDATE_CURRENCY', () => {
    expect(
      chartReducer(initialState, {
        type: 'UPDATE_CURRENCY',
        currency: 'ETH-USD',
      })
    ).toMatchSnapshot()
  })

  it('updates granularity on UPDATE_GRANULARITY', () => {
    expect(
      chartReducer(initialState, {
        type: 'UPDATE_GRANULARITY',
        granularity: 3600,
      })
    ).toMatchSnapshot()
  })
})
