import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  TouchableNativeFeedback,
  KeyboardAvoidingView
} from 'react-native';

import { color } from '../../assets/styles/theme';
import login from './loginStyle';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '123456',
      email: '197*****12@qq.com',
      verification: false,
      validate: '',
      isValidate: true
    };
    this.login = this.login.bind(this);
    this.validateFunc = this.validateFunc.bind(this);
  }

  // 设置标题样式
  static navigationOptions = {
    // 设置标题
    title: 'Login',
    // 将标题隐藏
    headerShown: false
  };

  login(evt) {
    const params = {
      username: this.state.name,
      password: this.state.pwd
    };

    console.log(params);

    this.setState({
      verification: true
    });
    // console.log(this.state.verification);
  }

  validateFunc() {
    // console.log(this.props.navigation);
    // 设置页面跳转
    this.props.navigation.navigate('index');
    this.setState({
      verification: false
    });
  }

  render() {
    return (
      <>
        {/* KeyboardAvoidingView可以自动根据键盘的位置，调整自身的 height 或底部的 padding，以避免被遮挡 */}
        <KeyboardAvoidingView style={login.container}>
          <View style={login.logo}>
            <Text style={login.logoIcon}>英领</Text>
            <Text style={login.logoTitle}>
              {this.state.name ? `Hello, ${this.state.name}` : 'YLink'}
            </Text>
          </View>
          <View style={login.formGroup}>
            <View style={login.inputGroup}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入邮箱/用户名"
                placeholderTextColor="#888"
                maxLength={10}
                textContentType="emailAddress"
                style={login.input}
                onChangeText={name => this.setState({ name })}
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
        <View>
          <Modal visible={this.state.verification} transparent={true}>
            <View style={login.tip}>
              <View style={login.tip_block}>
                <View>
                  <Text style={login.tip_title}>账户验证</Text>
                </View>
                <View style={login.tip_content}>
                  <Text style={login.tip_message}>
                    为了保证您的账户安全，我们将会向您{this.state.email}
                    的邮箱发送验证码
                  </Text>
                </View>
                <View>
                  <TextInput
                    autoCorrect={false}
                    autoFocus={true}
                    autoCapitalize="none"
                    placeholder="请输入验证码"
                    maxLength={4}
                    onChangeText={value => {
                      if (value.length === 4) {
                        this.setState({
                          validate: value,
                          isValidate: false
                        });
                      }
                    }}
                  />
                  <Button
                    style={login.tip_validate_button}
                    keyboardType="numeric"
                    disabled={this.state.isValidate}
                    title="验证"
                    color={color.minor_color}
                    onPress={this.validateFunc}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

export default LoginView;
