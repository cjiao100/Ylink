import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import TopBar from '../../components/topBar/topBar';
import { color } from '../../assets/styles/theme';

const { width } = Dimensions.get('window');

class forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotList: ['新型冠状病毒肺炎疫情', '想见你', '疫情辟谣', '李子维']
    };
  }
  render() {
    const length = this.state.hotList.length;
    const leftList = this.state.hotList.slice(0, Math.ceil(length / 2));
    const rightList = this.state.hotList.slice(Math.ceil(length / 2), length);
    return (
      <>
        <TopBar />
        <View style={{ backgroundColor: color.bg_info_color }}>
          <View style={{ padding: 20, backgroundColor: color.white_color }}>
            <Text>热门话题</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                {leftList.map((item, index) => (
                  <Text key={index} style={{ width: width / 2 }}>
                    #{item}#
                  </Text>
                ))}
              </View>
              <View style={{ padding: 10 }}>
                {rightList.map((item, index) => (
                  <Text key={index} style={{ width: width / 2 }}>
                    #{item}#
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default forum;
