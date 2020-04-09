import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import toast from '../../utils/toast';
import moment from '../../utils/moment';
import topic from '../../utils/topic';

class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: []
    };
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.getPostList();
  }

  getPostList() {
    requestWithToken({
      url: '/post/list/my',
      method: 'Get'
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          postList: res.data
        });
      })
      .catch(err => {
        console.warn(err);
        toast('获取失败');
      });
  }

  openPostDetails(post) {
    this.props.navigation.navigate('Post', {
      author: post.userInfo.name,
      postId: post._id,
      title: post.title
    });
  }

  _renderItem({ item }) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#fafafa"
        key={item._id}
        style={styles.post}
        onPress={() => this.openPostDetails(item)}
        // onLongPress={this.showModal}
      >
        <View>
          <View style={styles.post_header}>
            <View style={styles.post_header_left}>
              <Image
                style={styles.post_avatar}
                source={{
                  uri: `${global.URI}${item.userInfo.avatar}`
                }}
              />
              <View>
                <Text style={styles.post_author}>{item.userInfo.name}</Text>
                <Text style={styles.post_time}>{moment(item.created_at)}</Text>
              </View>
            </View>
            {/* <Text onPress={this.showModal}>更多操作</Text> */}
          </View>
          <View>
            <Text style={styles.post_title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.post_content} numberOfLines={5}>
              {topic(item.content, item.topicList)}
            </Text>
          </View>
          <View style={styles.post_img_group}>
            {item.images.map((img, index) => (
              <Image
                key={index}
                style={styles.post_img}
                source={{ uri: `${global.URI}${img}` }}
              />
            ))}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.postList}
        keyExtractor={item => item._id}
        refreshing={true}
        // ItemSeparatorComponent={() => (
        //   <SpliteLine lineHeight={2} color={color.bg_info_color} />
        // )}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  modal_blank: {
    flex: 1,
    color: 'transparent'
  },
  modal_button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.bg_info_color,
    backgroundColor: color.white_color
  },
  other_button: {
    paddingBottom: 10,
    backgroundColor: color.bg_info_color
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

export default MyPost;
