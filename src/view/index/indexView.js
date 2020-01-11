import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import TopBar from '../../components/topBar/topBar';

class index extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.genIndicator = this.genIndicator.bind(this);
  }

  // 设置标题样式
  static navigationOptions = {
    // 设置标题
    title: 'index',
    // 将标题隐藏
    headerShown: false
  };

  // 下拉列表底部
  genIndicator() {
    return (
      <View style={homeStyle.indicatorContainer}>
        <ActivityIndicator
          style={homeStyle.indicator}
          size="large"
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  loadData() {}

  render() {
    return (
      <View>
        <TopBar />
        <View>
          <FlatList
            data={[
              {
                id: 1,
                name: '双行列表',
                desc: '描述信息',
                img: '',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              }
            ]}
            renderItem={item => {}}
            ListFooterComponent={() => this.genIndicator()}
            onEndReached={() => {
              this.loadData();
            }}
          />
        </View>
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});

export default index;
