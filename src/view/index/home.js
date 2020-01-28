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

import { color, font } from '../../assets/styles/theme';

class Home extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.genIndicator = this.genIndicator.bind(this);
  }

  // 设置标题样式
  static navigationOptions = {
    // 设置标题
    title: 'home',
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
      <>
        <TopBar tagShow={true} />
        <ScrollView>
          <Carousel />
          <View style={homeStyle.listContainer}>
            <FlatList
              style={homeStyle.flexBox}
              data={[
                {
                  id: 1,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                },
                {
                  id: 2,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                },
                {
                  id: 3,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                },
                {
                  id: 4,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                },
                {
                  id: 5,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                },
                {
                  id: 6,
                  name: '双行列表',
                  desc: '描述信息',
                  img:
                    'https://img.zcool.cn/community/01fe605da7c8bca801209e1f2fee40.png@1280w_1l_0o_100sh.png',
                  status: { browse: 200, comment: '2630', awesome: 6983 }
                }
              ]}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={homeStyle.item}>
                  <View>
                    <Text style={homeStyle.itemTitle}>{item.name}</Text>
                    <Text style={homeStyle.itemDesc}>{item.desc}</Text>
                  </View>
                  <View style={homeStyle.flexBox}>
                    <Image
                      style={homeStyle.flexBox}
                      source={{ uri: item.img }}
                    />
                  </View>
                  <View style={homeStyle.itemStatus}>
                    <View>
                      <Text style={homeStyle.itemStatusTitle}>
                        浏览量
                        <Text style={homeStyle.itemStatusNum}>
                          {item.status.browse}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <Text style={homeStyle.itemStatusTitle}>
                        评论
                        <Text style={homeStyle.itemStatusNum}>
                          {item.status.comment}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <Text style={homeStyle.itemStatusTitle}>
                        点赞
                        <Text style={homeStyle.itemStatusNum}>
                          {item.status.awesome}
                        </Text>
                      </Text>
                    </View>
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
      </>
    );
  }
}

const homeStyle = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 20
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  },
  item: {
    marginTop: 10,
    padding: 10,
    flex: 1,
    height: 200,
    backgroundColor: color.white_color
  },
  itemTitle: {
    color: color.black_color,
    fontSize: font.primary_size
  },
  itemDesc: {
    color: color.info_color,
    fontSize: font.small_size
  },
  itemStatus: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 20,
    marginTop: 5
  },
  itemStatusTitle: {
    fontSize: font.small_size
  },
  itemStatusNum: {
    fontSize: font.small_size,
    color: color.info_color
  },
  flexBox: {
    flex: 1
  }
});

export default Home;
