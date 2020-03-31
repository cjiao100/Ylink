import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import Viewer from '../../components/imageViewer/imageViewer';

const { width } = Dimensions.get('window');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      post: {},
      comment: [
        {
          id: 1,
          user: {
            avatar: '',
            name: '战忽局'
          },
          content: 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
          create_at: '41分钟前'
        },
        {
          id: 2,
          user: {
            avatar: '',
            name: '战忽局'
          },
          content: 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
          create_at: '41分钟前'
        }
      ]
    };

    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.title,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        padding: 30
      }
    });
  }

  componentDidMount() {
    this.gitPostInfo();
  }

  gitPostInfo() {
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
                      {this.state.post.created_at}·
                      {this.state.post.postInfo.browse}浏览
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={postStyle.post_title}>
                  {this.state.post.title}
                </Text>
                <Text style={postStyle.post_content}>
                  {this.state.post.content}
                </Text>
              </View>
              <View>
                {this.state.post.images.map((img, index) => {
                  return (
                    <Image
                      resizeMode="contain"
                      resizeMethod="resize"
                      source={{ uri: `http://192.168.43.111:5000${img.url}` }}
                      key={index}
                      style={[postStyle.post_img, { height: img.height }]}
                    />
                  );
                })}
              </View>
            </View>

            <View style={postStyle.comment}>
              <View style={postStyle.comment_header}>
                <Text style={postStyle.comment_header_text}>
                  评论<Text>126</Text>
                </Text>
              </View>
              <View style={postStyle.comment_list}>
                {this.state.comment.map(item => (
                  <View key={item.id} style={postStyle.comment_list_content}>
                    <View style={postStyle.post_header_left}>
                      <Image style={postStyle.comment_avatar} />
                      <View>
                        <Text style={postStyle.post_author}>
                          {item.user.name}
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
            <TextInput
              placeholder="评论一下吧"
              style={postStyle.bottom_input}
            />
            <TouchableWithoutFeedback>
              <View style={postStyle.bottom_button}>
                <Text style={postStyle.bottom_button_title}>收藏</Text>
                <Text style={postStyle.bottom_button_num}>1000</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={postStyle.bottom_button}>
                <Text style={postStyle.bottom_button_title}>点赞</Text>
                <Text style={postStyle.bottom_button_num}>1000</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Viewer
            visible={this.state.visible}
            imageList={this.state.post.images}
          />
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
    backgroundColor: color.info_color,
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
    marginTop: 10,
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
    backgroundColor: color.info_color,
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
    // marginTop: 5,
    padding: 5
  },

  bottom: {
    // flex: 1,
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
    fontSize: font.small_size
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
  }
});

export default Post;
