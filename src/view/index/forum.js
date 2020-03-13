import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

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
        <View style={{ backgroundColor: color.bg_info_color, flex: 1 }}>
          <View
            style={{
              padding: 20,
              backgroundColor: color.white_color,
              marginTop: 10
            }}>
            <Text style={{ fontWeight: 'bold' }}>热门话题</Text>
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
          <View style={{ marginTop: 10, backgroundColor: color.white_color }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image />
                <View>
                  <Text>XXXX</Text>
                  <Text>17分钟前</Text>
                </View>
              </View>
              <Text>更多操作</Text>
            </View>
            <Text>123</Text>
          </View>
        </View>
      </>
    );
  }
}

export default forum;
