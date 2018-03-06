// @flow

import * as React from 'react'
import moment from 'moment'
import type { AxiosPromise } from 'axios'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native'
import { Icon, Spinner } from 'native-base'
import type {
  CandleData,
  ChartType,
  Currency,
  Granularity,
  HistoricData,
  LineData,
  LoadingState,
} from '../../types'

export type Props = {
  chartData: LineData | CandleData | null,
  chartType: ChartType,
  currency: Currency,
  fetchChartData: (
    currency: Currency,
    granularity: Granularity,
    silent?: boolean
  ) => AxiosPromise<HistoricData>,
  granularity: Granularity,
  loadingState: LoadingState,
}

type State = {
  width: number,
}

class Chart extends React.Component<Props, State> {
  state = {
    width: Dimensions.get('window').width - 30,
  }

  intervalId: ?IntervalID

  componentDidMount() {
    Dimensions.addEventListener('change', this.updateWidth)

    this.fetchData()
    this.resetPolling()
  }

  componentDidUpdate(prevProps: Props) {
    const { currency, granularity } = this.props

    if (
      prevProps.currency !== currency ||
      prevProps.granularity !== granularity
    ) {
      this.fetchData()
      this.resetPolling()
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateWidth)
  }

  resetPolling = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.intervalId = setInterval(() => this.fetchData(true), 10000)
  }

  updateWidth = (e: Object) => {
    this.setState({ width: e.window.width - 30 })
  }

  fetchData = (silent?: boolean = false) => {
    const { currency, granularity } = this.props
    this.props.fetchChartData(currency, granularity, silent)
  }

  render() {
    const { chartType, chartData, loadingState } = this.props
    const currentYear = new Date().getFullYear()

    let chart = null
    let overlay = null

    if (loadingState !== 'success') {
      let icon = null
      if (loadingState === 'loading') {
        icon = <Spinner color="white" />
      } else if (loadingState === 'failure') {
        icon = (
          <View style={styles.failed}>
            <Icon color="white" name="warning" style={styles.failedIcon} />
            <Text style={styles.failedText}>Failed to fetch data</Text>
          </View>
        )
      }

      overlay = <View style={styles.loadingOverlay}>{icon}</View>
    }

    if (!chartData) {
      return <View style={styles.empty}>{overlay}</View>
    }

    if (chartType === 'candle') {
      chart = (
        <VictoryCandlestick
          candleColors={{ positive: 'green', negative: 'red' }}
          data={chartData}
        />
      )
    } else {
      chart = (
        <VictoryLine data={chartData} style={{ data: { stroke: 'blue' } }} />
      )
    }

    return (
      <View>
        <VictoryChart
          domainPadding={{ x: 5, y: 25 }}
          padding={{ left: 65, right: 10, bottom: 40, top: 0 }}
          scale={{ x: 'time' }}
          theme={VictoryTheme.material}
          width={this.state.width}
        >
          <VictoryAxis
            fixLabelOverlap
            tickFormat={(date, i, dates) => {
              const adjacentIndex = i === 0 ? 1 : i - 1

              // ticks are >= 24 hours apart
              if (Math.abs(dates[adjacentIndex] - date) > 1000 * 60 * 60 * 24) {
                const year = date.getFullYear()
                const format = year !== currentYear ? 'l' : 'MMM D'
                return moment(date).format(format)
              }

              const showMinutes = date.getMinutes() !== 0
              return moment(date).format(showMinutes ? 'LT' : 'h A')
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={value => {
              const decimals = value < 1000 ? 2 : 0

              return value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            }}
          />
          {chart}
        </VictoryChart>
        {overlay}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  empty: {
    height: 400,
  },
  loadingOverlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
  },
  failed: {
    display: 'flex',
    alignItems: 'center',
  },
  failedIcon: {
    color: 'white',
    fontSize: 80,
  },
  failedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Chart
