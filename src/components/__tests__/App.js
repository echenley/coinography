jest.mock('react-navigation', () => {
  const AppStack = () => <div />
  return {
    StackNavigator: () => AppStack,
  }
})
jest.mock('native-base/Fonts/Roboto.ttf', () => 'Roboto')
jest.mock('native-base/Fonts/Roboto_medium.ttf', () => 'Roboto_medium')

import * as React from 'react'
import Expo from 'expo'
import { shallow } from 'enzyme'
import App from '../App'

function renderComponent() {
  return shallow(<App />, { disableLifecycleMethods: true })
}

describe('<App />', () => {
  it('renders correctly while loading', () => {
    expect(renderComponent().getElement()).toMatchSnapshot()
  })

  it('renders correctly after fonts are loaded', async () => {
    const component = renderComponent()
    await component.instance().componentDidMount()
    component.update()
    expect(Expo.Font.loadAsync).toHaveBeenCalledWith({
      Roboto: 'Roboto',
      Roboto_medium: 'Roboto_medium',
    })
    expect(component.getElement()).toMatchSnapshot()
  })
})
