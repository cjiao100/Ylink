import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';

import { color, font } from '../../assets/styles/theme';
import SpliteLine from '../../components/spliteLine/spliteLine';
import TopBar from '../../components/topBar/topBar';

class Study extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <TopBar />
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
              <View>
                <Text>
                  已完成
                  <Text style={studyStyle.planData_progress_text}>
                    {' '}
                    <Text style={studyStyle.planData_progress_complete_text}>
                      560
                    </Text>
                    /9887
                  </Text>
                </Text>
              </View>
              <View>
                <Text>单词本</Text>
              </View>
            </View>
            <View style={studyStyle.planInfo_progress}>
              <Progress.Bar
                progress={560 / 9887}
                color={color.primary_color}
                borderWidth={0}
                width={null}
              />
            </View>
          </View>
          <View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#4b1c18', false)}>
              <View style={studyStyle.studyButton}>
                <Text style={studyStyle.studyButton_text}>开始学习吧</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </>
    );
  }
}

const { height } = Dimensions.get('window');

const studyStyle = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: color.bg_info_color,
    height
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20
  },
  planData: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 30
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
  },
  planData_progress_text: {
    fontSize: font.primary_size,
    color: color.info_color
  },
  planData_progress_complete_text: {
    color: color.black_color,
    fontWeight: 'bold'
  },
  planInfo_progress: {
    borderColor: color.primary_color,
    borderWidth: 2,
    borderRadius: 20,
    padding: 2,
    marginTop: 10,
    marginBottom: 20
  },
  studyButton: {
    backgroundColor: color.primary_color,
    borderRadius: 5,
    marginTop: 50
  },
  studyButton_text: {
    color: color.white_color,
    textAlign: 'center',
    lineHeight: 45,
    fontSize: 28
  }
});

export default Study;
