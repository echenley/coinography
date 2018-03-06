import * as React from 'react'
import { Dimensions } from 'react-native'
import { shallow } from 'enzyme'
import Chart from '../Chart'

jest.useFakeTimers()

Dimensions.addEventListener = jest.fn()
Dimensions.removeEventListener = jest.fn()

const candleData = [
  {
    x: '2018-03-03T22:05:00.000Z',
    open: 11307,
    close: 11309.64,
    high: 11315.01,
    low: 11301.04,
  },
  {
    x: '2018-03-03T22:00:00.000Z',
    open: 11298.98,
    close: 11307,
    high: 11307,
    low: 11290.05,
  },
  {
    x: '2018-03-03T21:55:00.000Z',
    open: 11290.25,
    close: 11298.98,
    high: 11298.98,
    low: 11270,
  },
  {
    x: '2018-03-03T21:50:00.000Z',
    open: 11284.35,
    close: 11290.24,
    high: 11291.05,
    low: 11280,
  },
  {
    x: '2018-03-03T21:45:00.000Z',
    open: 11293.5,
    close: 11284.35,
    high: 11293.5,
    low: 11280.54,
  },
]

const lineData = [
  { x: '2018-03-03T22:05:00.000Z', y: 11309.64 },
  { x: '2018-03-03T22:00:00.000Z', y: 11307 },
  { x: '2018-03-03T21:55:00.000Z', y: 11298.98 },
  { x: '2018-03-03T21:50:00.000Z', y: 11290.24 },
  { x: '2018-03-03T21:45:00.000Z', y: 11284.35 },
]

function renderComponent(props) {
  return shallow(
    <Chart
      chartData={null}
      chartType="candle"
      currency="BTC-USD"
      fetchChartData={() => Promise.resolve([])}
      granularity={300}
      loadingState="loading"
      {...props}
    />
  )
}

describe('<Chart />', () => {
  afterEach(() => {
    Dimensions.addEventListener.mockClear()
    Dimensions.removeEventListener.mockClear()
  })

  it('renders correctly while loading', () => {
    expect(renderComponent().getElement()).toMatchSnapshot()
  })

  it('renders correctly while loading with stale data', () => {
    expect(
      renderComponent({
        chartData: candleData,
      }).getElement()
    ).toMatchSnapshot()
  })

  it('renders correctly in failure state', () => {
    expect(
      renderComponent({
        loadingState: 'failure',
      }).getElement()
    ).toMatchSnapshot()
  })

  it('renders a candle chart correctly', () => {
    expect(
      renderComponent({
        chartData: candleData,
        loadingState: 'success',
      }).getElement()
    ).toMatchSnapshot()
  })

  it('renders a line chart correctly', () => {
    expect(
      renderComponent({
        chartData: lineData,
        loadingState: 'success',
      }).getElement()
    ).toMatchSnapshot()
  })

  it('adds and removes Dimensions listener on mount and unmount', () => {
    const component = renderComponent()
    const instance = component.instance()

    expect(instance.intervalId).toBeDefined()
    expect(Dimensions.addEventListener).toHaveBeenCalledWith(
      'change',
      instance.updateWidth
    )

    component.unmount()

    expect(Dimensions.removeEventListener).toHaveBeenCalledWith(
      'change',
      instance.updateWidth
    )
  })

  it('updates state.width on orientation change', () => {
    const component = renderComponent()
    const { updateWidth } = component.instance()

    updateWidth({
      window: {
        width: 800,
      },
    })

    component.update()

    expect(component.state('width')).toBe(770)
  })

  it('fetches data on mount and on update', () => {
    const fetchChartData = jest.fn()
    const component = renderComponent({
      fetchChartData,
    })

    expect(fetchChartData).toHaveBeenCalledWith('BTC-USD', 300, false)

    component.setProps({
      currency: 'ETH-USD',
    })

    expect(fetchChartData).toHaveBeenCalledWith('ETH-USD', 300, false)
  })

  it('polls for chart data every 10 seconds', () => {
    const fetchChartData = jest.fn()
    renderComponent({
      fetchChartData,
    })


    jest.advanceTimersByTime(20000)

    expect(fetchChartData).toHaveBeenCalledTimes(3)
    expect(fetchChartData).toHaveBeenCalledWith('BTC-USD', 300, false)
    expect(fetchChartData).toHaveBeenCalledWith('BTC-USD', 300, true)
  })
})
