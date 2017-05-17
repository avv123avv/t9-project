
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Left, Right, Icon } from 'native-base';

import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <ListItem button onPress={() => this.navigateTo('home')}>
          <Right>
            <Icon style={styles.icon} name="md-home" size={25} color="rgba(255,255,255,0.6)"/>
          </Right>
          <Left>
            <Text style={styles.text}>Home</Text>
          </Left>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('settings')}>
          <Right>
            <Icon style={styles.icon} name="md-settings" size={50} color="rgba(255,255,255,0.6)"/>
          </Right>
          <Left>
            <Text style={styles.text}>Settings</Text>
          </Left>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
