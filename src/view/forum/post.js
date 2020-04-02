import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import Viewer from '../../components/imageViewer/imageViewer';
import toast from '../../utils/toast';
import moment from '../../utils/moment';
import topic from '../../utils/topic';

const { width, height } = Dimensions.get('window');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      visible: false,
      currentImagIndex: 0,
      post: {},
      comment: [],
      newComment: ''
    };

    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.title,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        padding: 30
      }
    });

    this.closeModel = this.closeModel.bind(this);
    this.postStar = this.postStar.bind(this);
    this.postAwesome = this.postAwesome.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.getPostInfo();
    this.getPostComment();
    this.postBrower();
  }

  getPostInfo() {
    requestWithToken({
      url: `/post/${this.props.route.params.postId}`,
      method: 'Get'
    })
      .then(res => {
        this.setState({
          post: res.data
        });
        this.getImageSize();
      })
      .catch(err => {
        toast('帖子加载失败');
        console.warn(err);
      });
  }

  getPostComment() {
    requestWithToken({
      url: `/post/${this.props.route.params.postId}/comment`,
      method: 'Get'
    })
      .then(res => {
        this.setState({
          comment: res.data
        });
      })
      .catch(err => {
        toast('评论加载失败');
        console.warn(err);
      });
  }

  postBrower() {
    requestWithToken({
      url: `/post/${this.props.route.params.postId}/browse`,
      method: 'Put'
    })
      .then(res => {
        // console.log(res);
        console.log('浏览');
      })
      .catch(err => {
        console.warn(err);
      });
  }

  postStar() {
    requestWithToken({
      url: `/post/${this.props.route.params.postId}/star`,
      method: 'Put'
    })
      .then(res => {
        if (this.state.post.currentUser.star) {
          toast('取消收藏(>_<)');
        } else {
          toast('收藏成功(^▽^)');
        }

        this.getPostInfo();
      })
      .catch(err => {
        toast('收藏失败');
        console.warn(err);
      });
  }
  postAwesome() {
    requestWithToken({
      url: `/post/${this.props.route.params.postId}/awesome`,
      method: 'Put'
    })
      .then(res => {
        if (this.state.post.currentUser.star) {
          toast('取消点赞(>_<)');
        } else {
          toast('点赞成功(^▽^)');
        }

        this.getPostInfo();
      })
      .catch(err => {
        toast('点赞失败');
        console.warn(err);
      });
  }

  async getImageSize() {
    const images = this.state.post.images;

    for (let i = 0; i < images.length; i++) {
      let url = images[i];
      await Image.getSize(
        `http://192.168.43.111:5000${url}`,
        (imgWidth, imgHeight) => {
          const ratio = (width - 30) / imgWidth;
          images[i] = {
            width,
            height: imgHeight * ratio,
            imgWidth,
            imgHeight,
            url
          };
        }
      );
    }

    this.setState({
      'post.images': images
    });
  }

  closeModel() {
    this.setState({ visible: false });
  }

  submitComment() {
    this.setState({ inputVisible: false });
    const comment = this.state.newComment;
    requestWithToken({
      url: `/post/${this.props.route.params.postId}/comment`,
      method: 'Put',
      data: {
        content: comment
      }
    })
      .then(res => {
        toast('发布评论成功');
        this.getPostComment();
        // console.log(res);
      })
      .catch(err => {
        toast('发布失败,请重试');
        console.warn(err);
      });
  }

  render() {
    if (Object.keys(this.state.post).length === 0) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <>
          <ScrollView style={postStyle.container}>
            <View style={postStyle.post}>
              <View style={postStyle.post_header}>
                <View style={postStyle.post_header_left}>
                  <Image
                    source={{
                      // eslint-disable-next-line prettier/prettier
                      uri: `http://192.168.43.111:5000${this.state.post.userInfo.avatar}`
                    }}
                    style={postStyle.post_avatar}
                  />
                  <View>
                    <Text style={postStyle.comment_author}>
                      {this.state.post.userInfo.name}
                    </Text>
                    <Text style={postStyle.post_time}>
                      {moment(this.state.post.created_at)} ·{' '}
                      {this.state.post.browse}浏览
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={postStyle.post_title}>
                  {this.state.post.title}
                </Text>
                <Text style={postStyle.post_content}>
                  {topic(this.state.post.content, this.state.post.topicList)}
                </Text>
              </View>
              <View>
                {this.state.post.images.map((img, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      onPress={() => {
                        this.setState({
                          visible: true,
                          currentImagIndex: index
                        });
                      }}>
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={{ uri: `http://192.168.43.111:5000${img.url}` }}
                        style={[postStyle.post_img, { height: img.height }]}
                      />
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>

            <View style={postStyle.comment}>
              <View style={postStyle.comment_header}>
                <Text style={postStyle.comment_header_text}>
                  评论 <Text>{this.state.comment.length}</Text>
                </Text>
              </View>
              <View style={postStyle.comment_list}>
                {this.state.comment.map(item => (
                  <View key={item._id} style={postStyle.comment_list_content}>
                    <View style={postStyle.post_header_left}>
                      <Image
                        source={{
                          uri: `http://192.168.43.111:5000${item.userId.avatar}`
                        }}
                        style={postStyle.comment_avatar}
                      />
                      <View>
                        <Text style={postStyle.post_author}>
                          {item.userId.name}
                        </Text>
                        <Text style={postStyle.post_time}>
                          {item.create_at}
                        </Text>
                      </View>
                    </View>
                    <View style={postStyle.comment_content}>
                      <Text>{item.content}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={postStyle.bottom}>
            <Text
              onPress={() => {
                this.setState({ inputVisible: true });
              }}
              style={postStyle.bottom_input}>
              评论一下吧
            </Text>
            <TouchableWithoutFeedback>
              <View style={postStyle.bottom_button}>
                <Text
                  style={[
                    postStyle.bottom_button_title,
                    this.state.post.currentUser.star
                      ? { color: color.primary_color }
                      : {}
                  ]}
                  onPress={this.postStar}>
                  收藏
                </Text>
                <Text style={postStyle.bottom_button_num}>
                  {this.state.post.postInfo.star}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={postStyle.bottom_button}>
                <Text
                  style={[
                    postStyle.bottom_button_title,
                    this.state.post.currentUser.awesome
                      ? { color: color.primary_color }
                      : {}
                  ]}
                  onPress={this.postAwesome}>
                  点赞
                </Text>
                <Text style={postStyle.bottom_button_num}>
                  {this.state.post.postInfo.awesome}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Viewer
            visible={this.state.visible}
            imageList={this.state.post.images}
            currentImagIndex={this.state.currentImagIndex}
            closeModel={this.closeModel}
          />

          <Modal visible={this.state.inputVisible} transparent={true}>
            <View style={postStyle.modal_view}>
              <Text
                onPress={() => {
                  this.setState({ inputVisible: false });
                }}
                style={postStyle.modal_block}>
                123
              </Text>
              <View style={postStyle.modal_input_block}>
                <TextInput
                  placeholder="说点什么"
                  autoFocus={true}
                  style={postStyle.modal_input}
                  onChangeText={text => this.setState({ newComment: text })}
                />
                <TouchableOpacity
                  disabled={this.state.newComment === ''}
                  onPress={this.submitComment}>
                  <Text style={postStyle.modal_button}>发布</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      );
    }
  }
}

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: color.bg_info_color
  },
  post: {
    padding: 15,
    backgroundColor: color.white_color,
    flex: 1
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
    marginTop: 5
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
    fontSize: 15,
    lineHeight: 25,
    color: '#101010'
  },
  post_img: {
    backgroundColor: color.bg_info_color,
    height: 200,
    width: width - 30,
    marginRight: 15
  },

  comment: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: color.white_color
  },
  comment_header: {
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1
  },
  comment_header_text: {
    color: color.black_color,
    fontSize: font.primary_size,
    lineHeight: 50,
    marginLeft: 20
  },
  comment_avatar: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 50
  },
  comment_author: {
    fontSize: font.primary_size,
    marginTop: 8
  },
  comment_list: {
    backgroundColor: color.white_color
  },
  comment_list_content: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea'
  },
  comment_content: {
    marginLeft: 50,
    padding: 5
  },

  bottom: {
    width,
    height: 40,
    elevation: 10,
    backgroundColor: color.white_color,
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  },
  bottom_input: {
    flex: 1,
    backgroundColor: color.bg_info_color,
    paddingVertical: 0,
    paddingLeft: 5,
    borderRadius: 10,
    fontSize: font.small_size,
    color: color.info_color,
    lineHeight: 30
  },
  bottom_button: {
    width: 70
  },
  bottom_button_title: {
    textAlign: 'center'
  },
  bottom_button_num: {
    textAlign: 'center',
    fontSize: font.small_size,
    color: color.info_color
  },

  modal_view: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  modal_block: {
    flex: 1,
    color: 'transparent'
  },
  modal_input_block: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white_color,
    paddingHorizontal: 10
  },
  modal_input: {
    flex: 1,
    backgroundColor: color.bg_info_color,
    padding: 0,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 10
  },
  modal_button: {
    fontSize: font.primary_size,
    lineHeight: 50,
    paddingHorizontal: 10
  }
});

export default Post;
