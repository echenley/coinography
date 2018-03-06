// @flow

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from 'native-base'
import type { ChartType, Currency, Granularity } from '../../types'

export type Props = {
  chartType: ChartType,
  currency: Currency,
  granularity: Granularity,
  updateChartType: (chartType: ChartType) => mixed,
  updateCurrency: (currency: Currency) => mixed,
  updateGranularity: (granularity: Granularity) => mixed,
}

const currencies: Array<Currency> = ['BTC-USD', 'ETH-USD']

const granularities: Array<Granularity> = [60, 300, 900, 3600, 21600, 86400]
const granularityLabels = {
  '60': '1m',
  '300': '5m',
  '900': '15m',
  '3600': '1h',
  '21600': '6h',
  '86400': '1d',
}

const chartTypes = ['line', 'candle']
const chartTypeLabels = {
  line: 'Line',
  candle: 'Candle',
}

const Controls = ({
  chartType,
  currency,
  granularity,
  updateChartType,
  updateCurrency,
  updateGranularity,
}: Props) => {
  return (
    <View style={styles.controls}>
      <Picker
        iosHeader="Chart Type"
        mode="dropdown"
        onValueChange={updateChartType}
        selectedValue={chartType}
        style={styles.picker}
        supportedOrientations={['portrait', 'landscape']}
      >
        {chartTypes.map(type => (
          <Picker.Item key={type} label={chartTypeLabels[type]} value={type} />
        ))}
      </Picker>
      <Picker
        iosHeader="Granularity"
        mode="dropdown"
        onValueChange={updateGranularity}
        selectedValue={granularity}
        style={styles.picker}
        supportedOrientations={['portrait', 'landscape']}
      >
        {granularities.map(g => (
          <Picker.Item key={g} label={granularityLabels[g]} value={g} />
        ))}
      </Picker>
      <Picker
        iosHeader="Currency Pair"
        mode="dropdown"
        onValueChange={updateCurrency}
        selectedValue={currency}
        style={styles.picker}
        supportedOrientations={['portrait', 'landscape']}
      >
        {currencies.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
})

export default Controls
