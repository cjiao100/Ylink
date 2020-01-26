import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import { color, font } from '../../assets/styles/theme';
import SpliteLine from '../../components/spliteLine/spliteLine';

class Study extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={studyStyle.container}>
        <View style={studyStyle.content}>
          <View style={studyStyle.planData}>
            <View>
              <Text style={studyStyle.planData_title}>今日单词</Text>
              <Text>
                <Text style={studyStyle.planData_num}>32</Text>个
              </Text>
            </View>
            <View>
              <Text style={studyStyle.planData_title}>剩余时间</Text>
              <Text>
                <Text style={studyStyle.planData_num}>32</Text>天
              </Text>
            </View>
          </View>
          <View style={studyStyle.planInfo}>
            <Text style={studyStyle.planInfo_name}>考研词汇</Text>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#4b1c18', false)}>
              <View style={studyStyle.planInfo_change}>
                <Text style={studyStyle.planData_text}>修改计划</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <SpliteLine lineHeight={2} color={color.bg_info_color} />
          <View style={studyStyle.planInfo}>
            <Text>
              已完成<Text style={{ marginRight: 10 }}>560</Text>/9887
            </Text>
            <Text>单词本</Text>
          </View>
        </View>
      </View>
    );
  }
}

const studyStyle = StyleSheet.create({
  container: {
    padding: 30
  },
  content: {
    backgroundColor: '#fff',
    height: 500,
    borderRadius: 20,
    padding: 20
  },
  planData: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20
  },
  planData_title: {
    fontSize: font.big_size,
    color: color.info_color
  },
  planData_num: {
    fontSize: 50
  },
  planInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  planInfo_name: {
    color: color.primary_color,
    fontWeight: 'bold'
  },
  planInfo_change: {
    borderWidth: 1,
    borderColor: color.info_color,
    borderRadius: 10,
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8
  },
  planData_text: {
    fontSize: font.small_size,
    color: color.info_color
  }
});

export default Study;
