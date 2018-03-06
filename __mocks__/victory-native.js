// Mocking these to avoid seeing the huge default theme object in snapshots

module.exports = {
  ...require.requireActual('victory-native'),
  VictoryAxis: 'VictoryAxis',
  VictoryCandlestick: 'VictoryCandlestick',
  VictoryChart: 'VictoryChart',
  VictoryLine: 'VictoryLine',
  VictoryTheme: {
    material: 'VictoryTheme.material',
  },
}
