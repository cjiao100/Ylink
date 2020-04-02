import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import TopBar from '../../components/topBar/topBar';
import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import toast from '../../utils/toast';
import moment from '../../utils/moment';
import topic from '../../utils/topic';

const { width } = Dimensions.get('window');

class forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      hotList: ['新型冠状病毒肺炎疫情', '想见你', '疫情辟谣', '李子维'],
      postList: []
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openPostDetails = this.openPostDetails.bind(this);
    this.createNewPost = this.createNewPost.bind(this);
    this.getPostList = this.getPostList.bind(this);
  }

  componentDidMount() {
    this.getPostList();
    this.getHotTopicList();
  }

  getPostList() {
    requestWithToken({
      url: '/post/list',
      method: 'Get',
      params: {
        pageNum: 0,
        pageSize: 10
      }
    })
      .then(res => {
        this.setState({
          postList: res.data
        });
      })
      .catch(err => {
        console.warn(err);
        toast('获取失败');
      });
  }

  getHotTopicList() {
    requestWithToken({
      url: '/topic/hot',
      method: 'Get'
    })
      .then(res => {
        // console.log(res);
        this.setState({
          hotList: res.data
        });
      })
      .catch(err => {
        toast('获取热门话题失败');
        console.warn(err);
      });
  }

  showModal() {
    this.setState({
      modalVisible: true
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  openPostDetails(post) {
    this.props.navigation.navigate('Post', {
      author: post.userInfo.name,
      postId: post._id,
      title: post.title
    });
  }

  createNewPost() {
    this.props.navigation.navigate('CreatePost', {
      refresh: this.getPostList
    });
  }

  render() {
    const length = this.state.hotList.length;
    const leftList = this.state.hotList.slice(0, Math.ceil(length / 2));
    const rightList = this.state.hotList.slice(Math.ceil(length / 2), length);
    return (
      <>
        <TopBar />
        <ScrollView>
          <View style={forumStyle.container}>
            <View style={forumStyle.hot_content}>
              <Text style={forumStyle.hot_title}>热门话题</Text>
              <View style={forumStyle.hot_list}>
                <View style={forumStyle.hot_left_and_right}>
                  {leftList.map(item => (
                    <Text
                      numberOfLines={1}
                      key={item._id}
                      style={{ width: width / 2 }}>
                      #{item.title}#
                    </Text>
                  ))}
                </View>
                <View style={forumStyle.hot_left_and_right}>
                  {rightList.map(item => (
                    <Text
                      numberOfLines={1}
                      key={item._id}
                      style={{ width: width / 2 }}>
                      #{item.title}#
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {/* 帖子 */}
            {this.state.postList.map(item => (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="#fafafa"
                key={item._id}
                style={forumStyle.post}
                onPress={() => this.openPostDetails(item)}
                onLongPress={this.showModal}>
                <View>
                  <View style={forumStyle.post_header}>
                    <View style={forumStyle.post_header_left}>
                      <Image
                        style={forumStyle.post_avatar}
                        source={{
                          // eslint-disable-next-line prettier/prettier
                          uri: `http://192.168.43.111:5000${item.userInfo.avatar}`
                        }}
                      />
                      <View>
                        <Text style={forumStyle.post_author}>
                          {item.userInfo.name}
                        </Text>
                        <Text style={forumStyle.post_time}>
                          {moment(item.created_at)}
                        </Text>
                      </View>
                    </View>
                    <Text onPress={this.showModal}>更多操作</Text>
                  </View>
                  <View>
                    <Text style={forumStyle.post_title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={forumStyle.post_content} numberOfLines={5}>
                      {topic(item.content, item.topicList)}
                    </Text>
                  </View>
                  <View style={forumStyle.post_img_group}>
                    {item.images.map((img, index) => (
                      <Image
                        key={index}
                        style={forumStyle.post_img}
                        source={{ uri: `http://192.168.43.111:5000${img}` }}
                      />
                    ))}
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>

        <TouchableHighlight
          underlayColor="#ed485e"
          style={forumStyle.add_post}
          onPress={this.createNewPost}>
          <Text style={forumStyle.add_post_text}>新</Text>
        </TouchableHighlight>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}>
          <View style={forumStyle.modal}>
            <View style={forumStyle.other_button}>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>收藏</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>举报</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>不感兴趣</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={this.closeModal}>
                <Text style={forumStyle.cancel_button}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const forumStyle = StyleSheet.create({
  container: {
    backgroundColor: color.bg_info_color,
    flex: 1
  },
  hot_content: {
    padding: 20,
    backgroundColor: color.white_color,
    marginTop: 10
  },
  hot_title: {
    fontWeight: 'bold'
  },
  hot_list: {
    display: 'flex',
    flexDirection: 'row'
  },
  hot_left_and_right: {
    padding: 10
  },
  post: {
    marginTop: 10,
    backgroundColor: color.white_color,
    padding: 15
  },
  post_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  post_header_left: {
    flexDirection: 'row'
  },
  post_avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50
  },
  post_author: {
    fontSize: font.primary_size,
    marginTop: 8
  },
  post_time: {
    color: color.info_color,
    fontSize: font.small_size
  },
  post_title: {
    fontSize: font.primary_size,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  post_content: {
    lineHeight: 20,
    color: '#101010'
  },
  post_img_group: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
    // justifyContent: 'space-between'
  },
  post_img: {
    backgroundColor: color.bg_info_color,
    height: 100,
    width: 100,
    marginRight: 15
  },
  modal: {
    backgroundColor: color.bg_info_color,
    position: 'absolute',
    bottom: 0,
    width: width
  },
  modal_button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.bg_info_color,
    backgroundColor: color.white_color
  },
  other_button: {
    marginBottom: 10
  },
  cancel_button: {
    textAlign: 'center'
  },
  add_post: {
    backgroundColor: color.primary_color,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50
  },
  add_post_text: {
    fontSize: font.big_size,
    color: color.white_color,
    textAlign: 'center',
    lineHeight: 50
  }
});

export default forum;
