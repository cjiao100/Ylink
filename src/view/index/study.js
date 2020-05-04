import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  Modal
} from 'react-native';
import * as Progress from 'react-native-progress';

import { color, font } from '../../assets/styles/theme';
import SpliteLine from '../../components/spliteLine/spliteLine';
import TopBar from '../../components/topBar/topBar';
import { requestWithToken } from '../../utils/request';

class Study extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planInfo: {},
      visible: false
    };

    this.startTest = this.startTest.bind(this);
    this.goSelectPage = this.goSelectPage.bind(this);
  }

  componentDidMount() {
    this.getPlanInfo();
    this.props.navigation.setParams({
      queryData: () => {
        this.getPlanInfo();
      }
    });
  }

  getPlanInfo() {
    requestWithToken({
      url: '/plan',
      method: 'Get'
    }).then(res => {
      if (res.data) {
        this.setState({
          planInfo: res.data
        });
      } else {
        this.setState({
          visible: true
        });
      }
    });
  }

  goSelectPage() {
    this.props.navigation.navigate('PlanList');
    this.setState({
      visible: false
    });
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
                <Text style={studyStyle.planData_nums}>
                  <Text style={studyStyle.planData_num}>
                    {this.state.planInfo.today}
                  </Text>
                  个
                </Text>
              </View>
            </View>
            <View style={studyStyle.planInfo}>
              <Text style={studyStyle.planInfo_name}>
                {this.state.planInfo.name}
              </Text>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#4b1c18', false)}
                onPress={this.goSelectPage}>
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
                      {this.state.planInfo.complete}
                    </Text>
                    /{this.state.planInfo.total}
                  </Text>
                </Text>
              </View>
              <View>
                <Text>单词本</Text>
              </View>
            </View>
            <View style={studyStyle.planInfo_progress}>
              <Progress.Bar
                progress={
                  this.state.planInfo.complete / this.state.planInfo.total || 0
                }
                color={color.primary_color}
                borderWidth={0}
                width={null}
              />
            </View>
          </View>
          <View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#4b1c18', false)}
              onPress={this.startTest}>
              <View style={studyStyle.studyButton}>
                <Text style={studyStyle.studyButton_text}>开始学习吧</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <Modal visible={this.state.visible} transparent={true}>
          <View style={studyStyle.modal}>
            <View style={studyStyle.modal_content}>
              <Text style={{ fontSize: font.primary_size }}>
                您还未选择学习计划,请选择后继续
              </Text>
              <View style={studyStyle.modal_button_group}>
                <Text
                  style={studyStyle.modal_button_back}
                  onPress={() => {
                    this.setState({
                      visible: false
                    });
                    this.props.navigation.goBack();
                  }}>
                  返回
                </Text>
                <Text
                  style={studyStyle.modal_button_select}
                  onPress={this.goSelectPage}>
                  去选择
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  startTest() {
    this.props.navigation.navigate('Test');
  }
}

const { height, width } = Dimensions.get('window');

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
  planData_nums: {
    textAlign: 'center'
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
  },

  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_content: {
    backgroundColor: color.white_color,
    borderRadius: 10,
    height: 100,
    width: width * 0.7,
    padding: 15,
    display: 'flex',
    justifyContent: 'space-between'
  },
  modal_button_group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modal_button_back: {
    color: color.info_color,
    padding: 5
  },
  modal_button_select: {
    color: color.white_color,
    backgroundColor: color.primary_color,
    padding: 5,
    borderRadius: 5,
    marginLeft: 5
  }
});

export default Study;
