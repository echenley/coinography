// @flow

import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  Text,
  Thumbnail,
} from 'native-base'
import { WebBrowser } from 'expo'
import Me from '../../images/Me.jpeg'

class AboutScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'About',
  }

  openBlog = () => {
    WebBrowser.openBrowserAsync('http://henleyedition.com')
  }

  openGitHub = () => {
    WebBrowser.openBrowserAsync('https://github.com/echenley')
  }

  openTwitter = () => {
    WebBrowser.openBrowserAsync('https://twitter.com/echenley')
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail small source={Me} />
                <Body>
                  <Text style={styles.heading}>Evan Henley</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Classical musician turned software engineer. Particularly
                  interested in ambitious React projects, forward-thinking
                  companies building state of the art web apps, and
                  participation in the open source JavaScript community. When
                  I’m not impetuously coding, I’m reading nonfiction, playing
                  convoluted board games, or building glorious fires in the
                  backyard.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button iconLeft onPress={this.openGitHub} small transparent>
                <Icon name="logo-github" style={styles.icon} />
                <Text>GitHub</Text>
              </Button>
              <Button iconLeft onPress={this.openTwitter} small transparent>
                <Icon name="logo-twitter" style={styles.icon} />
                <Text>Twtter</Text>
              </Button>
              <Button iconLeft onPress={this.openBlog} small transparent>
                <Icon name="link" style={styles.icon} />
                <Text>Blog</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
  },
})

export default AboutScreen
