import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Navigation from '../route';
import { refreshToken } from '../utils/request';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 请求未结束前, 默认需要登录
      checkedLogin: false
    };
  }
  componentDidMount() {
    refreshToken()
      .then(() => this.setState({ checkedLogin: true, isLogin: true }))
      .catch(err => {
        console.log(err);
        this.setState({
          checkedLogin: true,
          isLogin: false
        });
      });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#E91B36" />
        <SafeAreaView style={styles.main}>
          <NavigationContainer style={styles.container}>
            {Navigation(this.state.isLogin)}
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  }
});

export default App;
