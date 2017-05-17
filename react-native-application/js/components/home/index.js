
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import { Button } from 'nachos-ui';
import { Container, Header, Title, Content, Icon, Left, Body, Right } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import { setDigit, setWord, sendDigit } from '../../actions/home';

const { width } = Dimensions.get('window');

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    setDigit: React.PropTypes.func,
    setWord: React.PropTypes.func,
    sendDigit: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  async addToPin(num) {
    const digit = this.props.home.digit;
    digit.push(num);
    let word = await sendDigit(digit.join(''), this.props.settings.serverUrl);
    console.log('word', word)
    word = JSON.parse(word);
    if(word && word.data) {
        this.props.setWord(word.data);
    }
    this.props.setDigit(digit);
  }

  removeLastSymbol() {
    const digit = this.props.home.digit;
    if (digit.length > 0) {
      digit.pop();
      this.props.setDigit(digit);
    }
  }

  /**
   * Render buttons to enter digits
   * @param iteration
   * @returns {XML}
   */
  renderPinButtonsRow(iteration) {
    return (
      <View style={styles.pinButtonsRow} key={iteration}>
        {
          [1, 2, 3].map((i) => {
            const id = i + iteration * 3;
            return (
              <Button
                key={id}
                style={styles.pinButton}
                activeOpacity={0.5}
                onPress={() => this.addToPin(id)}
                textStyle={styles.pinButtonText}
                uppercase={false}
              >
                <Text>{`${id}`}</Text>
              </Button>
            );
          })
        }
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.containerLayout}>
        <Header>
          <Left></Left>

          <Body></Body>

          <Right>
              <Button
                  onPress={this.props.openDrawer}
                  uppercase={false}>
                <Icon active name="menu" />
              </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.header}>
              Enter digit numbers
            </Text>
            <Text style={styles.pinBar}>
                {this.props.home.digit}
            </Text>
            <Text style={styles.pinBar}>
                {this.props.home.word ? this.props.home.word.join(',') : ''}
            </Text>
            <View style={styles.pinButtonContainer}>
              {[0, 1, 2].map(i => this.renderPinButtonsRow(i))}
              <View style={styles.pinButtonsRow}>
                <View style={styles.pinButtonEmptySpace} />
                <Button
                  style={styles.pinButton}
                  activeOpacity={0.5}
                  onPress={() => this.addToPin(0)}
                  textStyle={styles.pinButtonText}
                  uppercase={false}
                >
                    <Text>0</Text>
                  </Button>
                <Button
                  style={styles.pinButton}
                  activeOpacity={0.5}
                  iconName="md-backspace"
                  iconColor="#7A7A7A"
                  onPress={() => this.removeLastSymbol()}
                  textStyle={styles.pinButtonText}
                  uppercase={false}
                />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    setDigit: digit => dispatch(setDigit(digit)),
    setWord: word => dispatch(setWord(word)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  home: state.home,
  name: state.user.name,
  list: state.list.list,
  settings: state.settings,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);

const styles = StyleSheet.create({
  // Main layout
  containerLayout: {
      backgroundColor: '#FBFAFA',
  },
  row: {
      flex: 1,
      alignItems: 'center',
  },
  text: {
      fontSize: 20,
      marginBottom: 15,
      alignItems: 'center',
  },
  mt: {
      marginTop: 18,
  },

  // Buttons layout
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7A7A7A',
    textAlign: 'center',
    margin: 10,
    marginTop: 30,
  },
  pinButtonContainer: {
    flex: 1,
    width,
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pinButtonsRow: {
    flexDirection: 'row',
    width: width - 60,
    height: (width - 60) / 3,
  },
  pinButton: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#7A7A7A',
    borderRadius: (width / 3) / 2,
    backgroundColor: '#FFFFFF',
  },
  pinButtonEmptySpace: {
    flex: 1,
  },
  pinButtonText: {
    color: '#7A7A7A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pinBar: {
    color: '#7A7A7A',
    fontSize: (width / 14),
    fontWeight: 'bold',
    height: 30,
    marginBottom: 10,
  },
  backspaceIcon: {
    width: 35,
    height: 35,
    color: '#7A7A7A',
  },
});
