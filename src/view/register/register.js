import React, { Component } from 'react';
import { StackActions } from '@react-navigation/native';
import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import request from '../../utils/request';
import Toast from '../../utils/toast';
import { saveToken, removeTokens } from '../../utils/storage';
import { color } from '../../assets/styles/theme';
import login from '../login/loginStyle';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pwd: '',
      pwdAgain: '',
      verification: false,
      validate: '1234',
      isValidate: true
    };
    this.register = this.register.bind(this);
    this.validateFunc = this.validateFunc.bind(this);
  }

  register(evt) {
    const params = {
      email: this.state.email || 'cjiao100@163.com',
      name: this.state.name || 'cjwcjw'
    };

    request({ url: '/user/verify', method: 'Post', data: params })
      .then(res => {
        this.setState({
          verification: true
        });
      })
      .catch(err => {
        Toast(err);
      });
  }

  validateFunc() {
    const params = {
      email: this.state.email || 'cjiao100@163.com',
      name: this.state.name || 'cjwcjw',
      password: this.state.pwd || '123456',
      password2: this.state.pwdAgain || '123456',
      code: this.state.validate
    };
    // 校验验证码
    request({ url: '/user/register', method: 'Post', data: params })
      .then(res => {
        this.setState({
          verification: false
        });
        // 注册成功返回登录页面
        this.props.navigation.goBack();
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
          </View>
          <View style={login.formGroup}>
            <View style={login.inputGroup}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入邮箱"
                placeholderTextColor="#888"
                style={login.input}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                maxLength={30}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入用户名"
                placeholderTextColor="#888"
                style={login.input}
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                maxLength={20}
                password={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="请输入密码"
                secureTextEntry={true}
                style={login.input}
                onChangeText={pwd => this.setState({ pwd })}
              />
              <TextInput
                maxLength={20}
                password={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="确认密码"
                secureTextEntry={true}
                style={login.input}
                onChangeText={pwdAgain => this.setState({ pwdAgain })}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableNativeFeedback
          style={login.buttonGroup}
          onPress={this.register}
          background={TouchableNativeFeedback.Ripple('#4b1c18', false)}>
          <View style={login.button}>
            <Text style={login.buttonText}>注册</Text>
          </View>
        </TouchableNativeFeedback>
        <View>
          <Modal
            visible={this.state.verification}
            transparent={true}
            onRequestClose={() => this.setState({ verification: false })}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ verification: false })}>
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
                            validate: value.toUpperCase(),
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
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </>
    );
  }
}

export default LoginView;
