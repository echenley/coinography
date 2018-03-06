// @flow

import React from 'react'
import Expo from 'expo'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import store from '../store'

const AppStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    About: {
      screen: AboutScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

type State = {
  loading: boolean,
}

class App extends React.Component<{}, State> {
  state = { loading: true }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })

    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }

    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    )
  }
}

export default App
