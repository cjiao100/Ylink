import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

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

    this.props.navigation.setParams({
      queryData: () => {
        this.refresh();
      }
    });
  }

  refresh() {
    this.setState(
      {
        pageNum: 0,
        pageSize: 5,
        list: [],
        total: 0,
        loading: true
      },
      () => {
        this.getArticleList().then(res => {
          this.setState({
            list: res.data,
            total: res.total
          });
        });
      }
    );
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

  openArticle(article) {
    this.props.navigation.navigate('Article', {
      articleId: article._id
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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.openArticle(item)}>
        <View style={homeStyle.item}>
          <View>
            <Text numberOfLines={1} style={homeStyle.itemTitle}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={homeStyle.itemDesc}>
              {item.content
                .split(/<(?!img).*?>/gi)
                .join('')
                .replace(/<(img)[^>]*>/gi, '[图片]')
                .replace(/&lt;/gi, '<')
                .replace(/&gt;/gi, '>')}
            </Text>
          </View>
          <View style={homeStyle.flexBox}>
            <Image
              style={homeStyle.flexBox}
              source={{ uri: `${global.URI}${item.coverImage}` || null }}
            />
          </View>
          <View style={homeStyle.itemStatus}>
            <View>
              <View style={homeStyle.itemStatusTitle}>
                <Icon name="eye" size={20} />
                <Text style={homeStyle.itemStatusNum}>{item.browse}</Text>
              </View>
            </View>
            <View>
              <View style={homeStyle.itemStatusTitle}>
                <Icon name="comment" size={20} />
                <Text style={homeStyle.itemStatusNum}>
                  {item.comment.length}
                </Text>
              </View>
            </View>
            <View>
              <View style={homeStyle.itemStatusTitle}>
                <Icon name="like" size={20} />
                <Text style={homeStyle.itemStatusNum}>
                  {item.awesome.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
      </>
    );
  }
}

const homeStyle = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
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
    paddingHorizontal: 15,
    flex: 1,
    height: 300,
    backgroundColor: color.white_color
  },
  itemTitle: {
    color: color.black_color,
    fontSize: 17,
    lineHeight: 30,
    fontWeight: 'bold'
  },
  itemDesc: {
    color: color.info_color,
    fontSize: font.small_size,
    marginBottom: 10
  },
  itemStatus: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 20,
    marginTop: 10
  },
  itemStatusTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
