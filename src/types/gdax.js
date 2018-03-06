// @flow

// https://docs.gdax.com/#get-historic-rates
// [time, low, high, open, close, volume]
export type HistoricDataPoint = [number, number, number, number, number, number]
export type HistoricData = Array<HistoricDataPoint>
export type LineData = Array<{ x: Date, y: number }>
export type CandleData = Array<{
  x: Date,
  open: number,
  close: number,
  high: number,
  low: number,
}>
