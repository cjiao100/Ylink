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
import { color } from '../../assets/styles/theme';
import login from './loginStyle';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
      email: '',
      verification: false,
      validate: '1234',
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
      email: this.state.email || 'cjw123@test.com',
      password: this.state.pwd || 'cjwcjw'
    };

    request({ url: '/user/login', method: 'Post', data: params })
      .then(res => {
        saveToken(res);
        console.log('登录成功');
        this.setState({
          verification: true
        });
      })
      .catch(err => {
        Toast(err);
      });
  }

  validateFunc() {
    const validate = this.state.validate;
    // TODO 校验验证码
    if (validate === '1234') {
      const { navigation } = this.props;
      // 设置页面跳转 使用BottomTabs替换Login路由 这样不会返回到登录页面
      navigation.dispatch(StackActions.replace('BottomTabs'));

      this.setState({
        verification: false
      });
    } else {
      removeTokens();
      Toast('验证码错误 登录失败');
    }
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
          <Modal
            visible={this.state.verification}
            transparent={true}
            onRequestClose={() => this.setState({ verification: false })}>
            <View style={login.tip}>
              <View style={login.tip_block}>
                <View>
                  <Text style={login.tip_title}>账户验证</Text>
                </View>
                <View style={login.tip_content}>
                  <Text style={login.tip_message}>
                    为了保证您的账户安全，我们将会向您的邮箱发送验证码
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
                    color={color.primary_color}
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
