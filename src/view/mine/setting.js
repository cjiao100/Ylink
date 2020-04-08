import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import SpliteLine from '../../components/spliteLine/spliteLine';
import { color } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import { removeTokens } from '../../utils/storage';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: []
    };

    this.exit = this.exit.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    requestWithToken({
      url: '/user',
      method: 'Get'
    }).then(res => {
      this.setState({
        userInfo: res.data
      });
    });
  }

  exit() {
    removeTokens();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <View style={styles.info}>
          <Text style={styles.info_text}>账户信息</Text>
          <Image
            style={styles.info_img}
            source={{
              uri: `http://192.168.43.111:5000/${this.state.userInfo.avatar}`
            }}
          />
        </View>
        <SpliteLine lineHeight={2} color={color.bg_info_color} />

        <View style={styles.email}>
          <Text>用户昵称</Text>
          <Text>{this.state.userInfo.name}</Text>
        </View>
        <SpliteLine lineHeight={2} color={color.bg_info_color} />

        <View style={styles.email}>
          <Text>认证邮箱</Text>
          <Text>{this.state.userInfo.email}</Text>
        </View>

        <View style={styles.button}>
          <Button
            title="退出登录"
            color={color.primary_color}
            onPress={this.exit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white_color
  },
  info_text: {
    lineHeight: 50
  },
  info_img: {
    width: 50,
    height: 50
  },
  email: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white_color
  },
  button: {
    paddingHorizontal: 30,
    marginTop: 30
  }
});

export default Setting;
