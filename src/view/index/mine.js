import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import TopBar from '../../components/topBar/topBar';
import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
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

  showCampusBlock(identity) {
    if (['0', '2', '3'].includes(identity)) {
      return (
        <View style={mineStyle.campusItem}>
          <View style={mineStyle.listItem}>
            <Text style={mineStyle.listItem_text}>我的班级</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <>
        <TopBar />
        <View style={mineStyle.container}>
          <View style={mineStyle.header}>
            <View style={mineStyle.avatar}>
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  // eslint-disable-next-line prettier/prettier
                  uri: `http://192.168.43.111:5000/${this.state.userInfo.avatar}`
                }}
              />
            </View>
            <View style={mineStyle.userInfo}>
              <View>
                <Text style={mineStyle.userInfo_name}>
                  {this.state.userInfo.name}
                </Text>
              </View>
              <View style={mineStyle.userInfo_other}>
                <View style={mineStyle.integral}>
                  <Text style={mineStyle.buttonText}>我的积分：0</Text>
                </View>
                <View style={[mineStyle.userInfo_right, mineStyle.userCenter]}>
                  <Text style={mineStyle.buttonText}>个人空间</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={mineStyle.starBlock}>
            <View>
              <Text
                style={mineStyle.starText}
                onPress={() => {
                  this.props.navigation.navigate('Star');
                }}>
                收藏夹
              </Text>
            </View>
            <View>
              <Text
                style={mineStyle.starText}
                onPress={() => {
                  this.props.navigation.navigate('WordBook');
                }}>
                单词本
              </Text>
            </View>
          </View>
          <View style={mineStyle.listBlock}>
            <View style={mineStyle.otherBlock}>
              <View style={mineStyle.listItem}>
                <Text style={mineStyle.listItem_text}>我的帖子</Text>
              </View>
              <View style={mineStyle.listItem}>
                <Text style={mineStyle.listItem_text}>我的计划</Text>
              </View>
            </View>
            {this.showCampusBlock(this.state.userInfo.identity)}
          </View>
        </View>
      </>
    );
  }
}

const mineStyle = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row'
    backgroundColor: color.bg_info_color
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: color.white_color
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50
  },
  userInfo: {
    flex: 1,
    paddingTop: 5,
    marginLeft: 20,
    justifyContent: 'space-between'
  },
  userInfo_name: {
    fontSize: font.big_size,
    fontWeight: 'bold'
  },
  userInfo_num: {
    display: 'flex',
    flexDirection: 'row'
  },
  userInfo_other: {
    display: 'flex',
    flexDirection: 'row'
  },
  userInfo_right: {
    marginLeft: 20
  },
  integral: {
    backgroundColor: color.bg_info_color,
    borderRadius: 50,
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: font.small_size,
    lineHeight: font.small_size + 10
  },
  userCenter: {
    borderWidth: 1.5,
    borderColor: color.bg_info_color,
    borderRadius: 50,
    paddingHorizontal: 10
  },
  starBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 40,
    backgroundColor: color.white_color,
    borderRadius: 10,
    height: 50,
    borderColor: color.bg_info_color,
    borderWidth: 1.5,
    transform: [
      {
        translateY: -25
      }
    ]
  },
  starText: {
    lineHeight: 50
  },
  listBlock: {
    marginTop: -20,
    flex: 1
  },
  otherBlock: {
    backgroundColor: color.white_color
  },
  listItem: {
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  campusItem: {
    marginTop: 10,
    backgroundColor: color.white_color
  },
  listItem_text: {
    lineHeight: 50
  }
});

export default Mine;
