import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import { color, font } from '../../assets/styles/theme';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'post',
      post: {
        id: 1,
        author: '共青团中央',
        data: '17分钟前',
        title: '武汉市新冠肺炎疫情防控指挥部通告',
        content:
          '武汉市新冠肺炎疫情防控指挥部发布的《关于加强进出武汉市车辆和人员管理的通告》(第17号)，系市指挥部下设的交通防控组未经指挥部研究和主要领导同志同意发布的，现宣布该通告无效。对此，我们对相关人员进行了严肃的批评处理。武汉市坚决贯彻习近平总书记关于“外防输出”的重要指示精神，牢固树立全国一盘棋的思想，严格离汉通道管理，严格人员管控，严防疫情向外输出。\n 特此通告\n 武汉市新冠肺炎疫情防控指挥部 \n 2020年2月24日',
        img: [1, 2],
        browse: 3000
      },
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
        marginLeft: 30
      }
    });
  }

  render() {
    return (
      <>
        <ScrollView style={postStyle.container}>
          <View style={postStyle.post}>
            <View style={postStyle.post_header}>
              <View style={postStyle.post_header_left}>
                <Image style={postStyle.post_avatar} />
                <View>
                  <Text style={postStyle.comment_author}>
                    {this.state.post.author}
                  </Text>
                  <Text style={postStyle.post_time}>
                    {this.state.post.data}·{this.state.post.browse}浏览
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={postStyle.post_title}>{this.state.post.title}</Text>
              <Text style={postStyle.post_content}>
                {this.state.post.content}
              </Text>
            </View>
            <View>
              {this.state.post.img.map((img, index) => (
                <Image key={index} style={postStyle.post_img} />
              ))}
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
                      <Text style={postStyle.post_time}>{item.create_at}</Text>
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
          <TextInput placeholder="评论一下吧" style={postStyle.bottom_input} />
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
      </>
    );
  }
}

const { width } = Dimensions.get('window');

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
