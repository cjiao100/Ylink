import React, { Component } from 'react';
import { StackActions } from '@react-navigation/native';
import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  TouchableNativeFeedback,
  KeyboardAvoidingView
} from 'react-native';
import request from '../../utils/request';
import Toast from '../../utils/toast';
import { saveToken, removeTokens } from '../../utils/storage';
import { color, font } from '../../assets/styles/theme';
import login from './loginStyle';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
      email: ''
    };
    this.login = this.login.bind(this);
  }

  login(evt) {
    const params = {
      email: this.state.email || 'cjw123@test.com',
      password: this.state.pwd || 'cjwcjw'
    };

    request({ url: '/user/login', method: 'Post', data: params })
      .then(res => {
        saveToken(res);
        console.log('登录成功');
        const { navigation } = this.props;
        // 设置页面跳转 使用BottomTabs替换Login路由 这样不会返回到登录页面
        navigation.dispatch(StackActions.replace('BottomTabs'));
      })
      .catch(err => {
        Toast(err);
      });
  }

  render() {
    return (
      <>
        {/* KeyboardAvoidingView可以自动根据键盘的位置，调整自身的 height 或底部的 padding，以避免被遮挡 */}
        <KeyboardAvoidingView style={login.container}>
          <View style={login.logo}>
            <Text style={login.logoIcon}>Ylink</Text>
            <Text style={login.logoTitle}>
              {this.state.email
                ? `Hello, ${this.state.email.split('@')[0]}`
                : 'YLink'}
            </Text>
          </View>
          <View style={login.formGroup}>
            <View style={login.inputGroup}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入邮箱/用户名"
                placeholderTextColor="#888"
                textContentType="emailAddress"
                style={login.input}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                password={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入密码"
                textContentType="password"
                secureTextEntry={true}
                style={login.input}
                onChangeText={pwd => this.setState({ pwd })}
              />
            </View>
            <Text
              style={login.text}
              onPress={() => {
                const { navigation } = this.props;
                navigation.navigate('Register');
              }}>
              还没账号,注册一个?
            </Text>
            <TouchableNativeFeedback
              style={login.buttonGroup}
              onPress={this.login}
              background={TouchableNativeFeedback.Ripple('#4b1c18', false)}>
              <View style={login.button}>
                <Text style={login.buttonText}>登录</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default LoginView;
