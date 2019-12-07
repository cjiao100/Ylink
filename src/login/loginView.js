import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import login from './loginStyle';

class LoginView extends Component {
  state = {
    name: 'cjw',
    pwd: '123456',
  };

  render() {
    return (
      <View>
        <View>
          <Text>{this.state.name}</Text>
          <Text>{this.state.pwd}</Text>
        </View>
        <View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="请输入邮箱/用户名"
            placeholderTextColor="#888"
            maxLength={10}
            textContentType="emailAddress"
            style={login.input}
            onChangeText={name => this.setState({name})}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="请输入密码"
            textContentType="password"
            style={login.input}
            onChangeText={pwd => this.setState({pwd})}
          />
        </View>
      </View>
    );
  }
}

export default LoginView;
