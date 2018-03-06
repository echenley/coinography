import * as React from 'react'
import { shallow } from 'enzyme'
import HomeScreen from '../HomeScreen'

const renderComponent = () => shallow(<HomeScreen />)

describe('<HomeScreen />', () => {
  it('renders correctly', () => {
    expect(renderComponent().getElement()).toMatchSnapshot()
  })

  it('has correct navigation options', () => {
    const navigation = {
      navigate: jest.fn(),
    }

    const options = HomeScreen.navigationOptions({ navigation })

    expect(options.title).toBe('Coinography')
    expect(options.headerRight).toMatchSnapshot('headerRight')

    options.headerRight.props.children.props.onPress()
    expect(navigation.navigate).toHaveBeenCalledWith('About')
  })
})
