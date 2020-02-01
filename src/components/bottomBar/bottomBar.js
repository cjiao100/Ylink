import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

import { color } from '../../assets/styles/theme';

const BottomBar = props => {
  const { jumpTo } = props;

  return (
    <BoxShadow setting={shadowOpt}>
      <View style={barStyle.container}>
        <View>
          <Text
            style={barStyle.barText}
            onPress={() => {
              jumpTo('Home');
            }}>
            首页
          </Text>
        </View>
        <View>
          <Text
            style={barStyle.barText}
            onPress={() => {
              jumpTo('Study');
            }}>
            学习
          </Text>
        </View>
        <View>
          <View style={barStyle.search}>
            <Text style={barStyle.searchText}>查</Text>
          </View>
        </View>
        <View>
          <Text style={barStyle.barText}>论坛</Text>
        </View>
        <View>
          <Text
            style={barStyle.barText}
            onPress={() => {
              jumpTo('Mine');
            }}>
            我的
          </Text>
        </View>
      </View>
    </BoxShadow>
  );
};

// 获取屏幕宽度
const { width } = Dimensions.get('window');
const barStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    backgroundColor: color.white_color
  },
  search: {
    backgroundColor: color.primary_color,
    height: 60,
    width: 60,
    borderRadius: 50,
    // translateY: -10
    transform: [
      {
        translateY: -10
      }
    ]
  },
  searchText: {
    color: color.white_color,
    lineHeight: 60,
    textAlign: 'center'
  },
  barText: {
    lineHeight: 40
  }
});
// 设置阴影
const shadowOpt = {
  width: width,
  height: 40,
  color: color.info_color,
  border: 3,
  opacity: 0.2
};

export default BottomBar;
