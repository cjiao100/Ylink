import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import TopBar from '../../components/topBar/topBar';
import { color, font } from '../../assets/styles/theme';

class Mine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const { jumpTo } = this.props;

    return (
      <>
        <TopBar />
        <View style={mineStyle.container}>
          <View style={mineStyle.header}>
            <View style={mineStyle.avatar}>
              <Image />
            </View>
            <View style={mineStyle.userInfo}>
              <View>
                <Text style={mineStyle.userInfo_name}>我的名字</Text>
              </View>
              <View style={mineStyle.userInfo_num}>
                <Text>
                  关注：
                  <Text style={{ fontSize: font.primary_size }}>123</Text>
                </Text>
                <Text style={mineStyle.userInfo_right}>
                  粉丝：
                  <Text style={{ fontSize: font.primary_size }}>123</Text>
                </Text>
              </View>
              <View style={mineStyle.userInfo_other}>
                <View style={mineStyle.integral}>
                  <Text style={mineStyle.buttonText}>我的积分：60</Text>
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
                  this.props.navigation.navigate('star');
                }}>
                收藏夹
              </Text>
            </View>
            <View>
              <Text
                style={mineStyle.starText}
                onPress={() => {
                  this.props.navigation.navigate('wordbook');
                }}>
                单词本
              </Text>
            </View>
          </View>
          <View style={mineStyle.listBlock}>
            <View style={mineStyle.listItem}>
              <Text style={mineStyle.listItem_text}>动态</Text>
            </View>
            <View style={mineStyle.listItem}>
              <Text style={mineStyle.listItem_text}>讨论贴</Text>
            </View>
            <View style={mineStyle.listItem}>
              <Text style={mineStyle.listItem_text}>练习试卷</Text>
            </View>
            <View style={mineStyle.listItem}>
              <Text style={mineStyle.listItem_text}>回答</Text>
            </View>
            <View style={mineStyle.listItem}>
              <Text style={mineStyle.listItem_text}>课程</Text>
            </View>
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
    // paddingVertical: 20,
    backgroundColor: color.white_color
  },
  avatar: {
    backgroundColor: '#ff7272',
    height: 80,
    width: 80,
    borderRadius: 50
  },
  userInfo: {
    flex: 1,
    paddingTop: 5,
    // paddingBottom: 5,
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
    flex: 1,
    backgroundColor: color.white_color
  },
  listItem: {
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItem_text: {
    lineHeight: 50
  }
});

export default Mine;
