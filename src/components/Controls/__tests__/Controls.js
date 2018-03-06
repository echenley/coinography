import * as React from 'react'
import { shallow } from 'enzyme'
import { Picker } from 'native-base'
import Controls from '../Controls'

function renderComponent(props) {
  return shallow(
    <Controls
      chartType="candle"
      currency="BTC-USD"
      granularity={300}
      updateChartType={() => {}}
      updateCurrency={() => {}}
      updateGranularity={() => {}}
      {...props}
    />
  )
}

describe('<Controls />', () => {
  it('renders correctly', () => {
    expect(renderComponent().getElement()).toMatchSnapshot()
  })

  it('calls update functions', () => {
    const updateChartType = jest.fn()
    const updateCurrency = jest.fn()
    const updateGranularity = jest.fn()
    const component = renderComponent({
      updateChartType,
      updateCurrency,
      updateGranularity,
    })

    expect(updateChartType).not.toHaveBeenCalled()
    expect(updateGranularity).not.toHaveBeenCalled()
    expect(updateCurrency).not.toHaveBeenCalled()

    component
      .find(Picker)
      .at(0)
      .prop('onValueChange')('line')
    expect(updateChartType).toHaveBeenCalledWith('line')

    component
      .find(Picker)
      .at(1)
      .prop('onValueChange')(3600)
    expect(updateGranularity).toHaveBeenCalledWith(3600)

    component
      .find(Picker)
      .at(2)
      .prop('onValueChange')('ETH-USD')
    expect(updateCurrency).toHaveBeenCalledWith('ETH-USD')
  })
})
