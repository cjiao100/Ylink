import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import TopBar from '../../components/topBar/topBar';
import Carousel from '../../components/carousel/carousel';

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
      <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
        <TopBar />
        <Carousel />
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
          <FlatList
            style={{ flex: 1 }}
            data={[
              {
                id: 1,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              },
              {
                id: 2,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              },
              {
                id: 3,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              },
              {
                id: 4,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              },
              {
                id: 5,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              },
              {
                id: 6,
                name: '双行列表',
                desc: '描述信息',
                img:
                  'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                status: { forward: 200, comment: '2630', awesome: 6983 }
              }
            ]}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  height: 200
                  //   backgroundColor: '#ace',
                  //   marginBottom: 10
                }}>
                <View>
                  <Text style={{ color: '#000' }}>{item.name}</Text>
                  <Text>{item.desc}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image style={{ flex: 1 }} source={{ uri: item.img }} />
                </View>
              </View>
            )}
            ListFooterComponent={() => this.genIndicator()}
            onEndReached={() => {
              this.loadData();
            }}
          />
        </View>
      </ScrollView>
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
