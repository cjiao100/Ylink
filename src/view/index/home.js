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
import request from '../../utils/request';

import { color, font } from '../../assets/styles/theme';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: 0,
      pageSize: 5,
      list: [],
      total: 0,
      loading: true
    };

    this.loadData = this.loadData.bind(this);
    this.genIndicator = this.genIndicator.bind(this);
  }

  componentDidMount() {
    this.getArticleList().then(res => {
      this.setState({
        list: res.data,
        total: res.total
      });
    });
  }

  getArticleList() {
    return request({
      url: '/article/inquire',
      method: 'Get',
      params: {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize
      }
    });
  }

  // 下拉列表底部
  genIndicator() {
    const { loading } = this.state;
    if (loading) {
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
    } else {
      return <></>;
    }
  }

  renderItem(item) {
    return (
      <View style={homeStyle.item}>
        <View>
          <Text numberOfLines={1} style={homeStyle.itemTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={homeStyle.itemDesc}>
            {item.content}
          </Text>
        </View>
        <View style={homeStyle.flexBox}>
          <Image
            style={homeStyle.flexBox}
            source={{ uri: item.coverImage || null }}
          />
        </View>
        <View style={homeStyle.itemStatus}>
          <View>
            <Text style={homeStyle.itemStatusTitle}>
              浏览量
              <Text style={homeStyle.itemStatusNum}>{item.browse.length}</Text>
            </Text>
          </View>
          <View>
            <Text style={homeStyle.itemStatusTitle}>
              评论
              <Text style={homeStyle.itemStatusNum}>{item.comment.length}</Text>
            </Text>
          </View>
          <View>
            <Text style={homeStyle.itemStatusTitle}>
              点赞
              <Text style={homeStyle.itemStatusNum}>{item.awesome.length}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  loadData() {
    let { pageNum, pageSize, total, list } = this.state;
    if ((pageNum + 1) * pageSize < total) {
      pageNum = pageNum + 1;
      this.setState({ pageNum }, () => {
        this.getArticleList().then(res => {
          list.push(...res.data);
          this.setState({
            list: list
          });
        });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <>
        <TopBar tagShow={true} />
        <ScrollView>
          <View style={homeStyle.listContainer}>
            <FlatList
              style={homeStyle.flexBox}
              data={this.state.list}
              keyExtractor={item => item._id}
              ListHeaderComponent={<Carousel />}
              renderItem={({ item }) => this.renderItem(item)}
              ListFooterComponent={() => this.genIndicator()}
              onEndReached={this.loadData}
              onEndReachedThreshold={0.2}
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
