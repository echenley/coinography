// @flow

// https://docs.gdax.com/#get-historic-rates
// [time, low, high, open, close, volume]
export type HistoricDataPoint = [number, number, number, number, number, number]
export type HistoricData = Array<HistoricDataPoint>
