
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, View } from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { setServerUrl } from '../../actions/settings';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
    popRoute,
    replaceAt,
} = actions;

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverUrl: props.settings.serverUrl,
    };
  }

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setServerUrl: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  popRoute() {
    //this.props.popRoute(this.props.navigation.key);
    this.navigateTo('home');
  }

  setServerUrl(serverUrl) {
    this.props.setServerUrl(serverUrl);
  }

  saveSettings() {
    this.setServerUrl(this.state.serverUrl);
    this.navigateTo('home');
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.popRoute()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{(name) ? this.props.name : 'Settings'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <View style={styles.view}>
            <Item style={styles.input}>
              <Icon style={styles.icon} active name="md-desktop" />
              <Input
                style={styles.icon}
                placeholder="Server"
                placeholderTextColor="#ffffff"
                defaultValue={this.props.settings.serverUrl}
                onChangeText={serverUrl => this.setState({ serverUrl })}
              />
            </Item>
          </View>
          <Button rounded style={styles.btn} onPress={() => this.saveSettings()}>
            <Text style={styles.btnText}>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setServerUrl: serverUrl => dispatch(setServerUrl(serverUrl)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  settings: state.settings,
});


export default connect(mapStateToProps, bindAction)(Settings);
