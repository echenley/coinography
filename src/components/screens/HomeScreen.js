// @flow

import React from 'react'
import { Button, Card, Container, Content, Right, Text } from 'native-base'
import type { NavigationNavigatorProps } from 'react-navigation'
import Chart from '../Chart'
import Controls from '../Controls'

class HomeScreen extends React.Component<{}> {
  static navigationOptions = ({
    navigation,
  }: NavigationNavigatorProps<*, *>) => ({
    title: 'Coinography',
    headerRight: (
      <Right>
        <Button onPress={() => navigation.navigate('About')} transparent>
          <Text>About</Text>
        </Button>
      </Right>
    ),
  })

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <Controls />
            <Chart />
          </Card>
        </Content>
      </Container>
    )
  }
}

export default HomeScreen
