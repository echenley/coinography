jest.mock('axios')

import axios from 'axios'
import {
  updateChartType,
  updateCurrency,
  updateGranularity,
  fetchChartData,
} from '../chart'

describe('chart actions', () => {
  describe('updateChartType', () => {
    it('returns correct action object', () => {
      expect(updateChartType('line')).toMatchSnapshot()
    })
  })

  describe('updateCurrency', () => {
    it('returns correct action object', () => {
      expect(updateCurrency('BTC-USD')).toMatchSnapshot()
    })
  })

  describe('updateGranularity', () => {
    it('returns correct action object', () => {
      expect(updateGranularity(300)).toMatchSnapshot()
    })
  })

  describe('fetchChartData', () => {
    it('dispatches correct actions on successful fetch', async () => {
      const response = { data: [] }
      axios.get.mockReturnValueOnce(Promise.resolve(response))

      const dispatch = jest.fn()
      const thunk = fetchChartData('BTC-USD', 300)

      const promise = thunk(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 1,
        silent: false,
      })

      expect(axios.get.mock.calls[0][0]).toMatchSnapshot(
        'calls correct api endpoint'
      )

      const returnValue = await promise

      expect(returnValue).toBe(response)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'FETCH_HISTORIC_DATA_SUCCESS',
        data: response.data,
        requestId: 1,
      })
    })

    it('dispatches correct actions on failed fetch', async () => {
      const errorResponse = {}
      axios.get.mockReturnValueOnce(Promise.reject(errorResponse))

      const dispatch = jest.fn()
      const thunk = fetchChartData('BTC-USD', 300)

      const promise = thunk(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'FETCH_HISTORIC_DATA_LOADING',
        requestId: 2,
        silent: false,
      })

      let error
      try {
        await promise
      } catch (e) {
        error = e
      }

      expect(error).toBe(errorResponse)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'FETCH_HISTORIC_DATA_FAILURE',
        error: errorResponse,
        requestId: 2,
      })
    })
  })
})
