jest.mock('expo')

import * as React from 'react'
import { shallow } from 'enzyme'
import { WebBrowser } from 'expo'
import { Button } from 'native-base'
import AboutScreen from '../AboutScreen'

WebBrowser.openBrowserAsync = jest.fn()

const renderComponent = () => shallow(<AboutScreen />)

describe('<AboutScreen />', () => {
  it('renders correctly', () => {
    expect(renderComponent().getElement()).toMatchSnapshot()
  })

  it('opens web browser for links', () => {
    const component = renderComponent()

    expect(WebBrowser.openBrowserAsync).not.toHaveBeenCalled()

    component
      .find(Button)
      .at(0)
      .simulate('press')
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledTimes(1)
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(
      'https://github.com/echenley'
    )

    component
      .find(Button)
      .at(1)
      .simulate('press')
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledTimes(2)
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(
      'https://twitter.com/echenley'
    )

    component
      .find(Button)
      .at(2)
      .simulate('press')
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledTimes(3)
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(
      'http://henleyedition.com'
    )
  })
})
