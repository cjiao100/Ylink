import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { color, font } from '../../assets/styles/theme';
import moment from '../../utils/moment';
import toast from '../../utils/toast';
import topic from '../../utils/topic';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      goSearch: false,
      showTab: 'article',
      result: {
        article: [
          {
            __v: 0,
            _id: '5e8dee38016a5547a34dcb47',
            awesome: [],
            browse: 1,
            comment: [
              '5e8def5d016a5547a34dcb48',
              '5e8def5e016a5547a34dcb49',
              '5e8def5e016a5547a34dcb4a',
              '5e8def5f016a5547a34dcb4b'
            ],
            content: '这是内容',
            coverImage: '',
            created_at: '2020-04-08T15:31:04.632Z',
            title: '111',
            updated_at: '2020-05-04T06:54:24.296Z',
            userId: '5e7d6a392f2630179fc2fe7f',
            video: ''
          },
          {
            __v: 0,
            _id: '5e329f5bbc6b53546c8b54a2',
            awesome: [],
            browse: 0,
            comment: [],
            content: '这是内容',
            coverImage: '',
            created_at: '2020-01-30T09:18:09.777Z',
            title: '111',
            userId: '5e7d6a392f2630179fc2fe7f',
            video: ''
          }
        ],
        post: [
          {
            _id: '5e82d7d4f37bbf0f94649a1e',
            browse: 141,
            content: 'test',
            created_at: '2020-03-31T05:40:36.923Z',
            images: [
              '/post/3a7780533fbc109d68bd49eb733d2ad4.png',
              '/post/799101e44be75b0082c6e0735cf29366.png'
            ],
            postInfo: { awesome: 0, star: 0 },
            title: 'test',
            topicList: [],
            updated_at: '2020-04-08T11:39:25.147Z',
            userInfo: {
              avatar: '/avatar/e26500fef320f06ab8a915e0a91a3333.png',
              name: 'cjiao100'
            }
          },
          {
            _id: '5e82d7f83d6fa63b62d25c90',
            browse: 6,
            content: 'test',
            created_at: '2020-03-31T05:41:12.444Z',
            images: [
              '/post/3a7780533fbc109d68bd49eb733d2ad4.png',
              '/post/799101e44be75b0082c6e0735cf29366.png'
            ],
            postInfo: { awesome: 0, star: 0 },
            title: 'test',
            topicList: [],
            updated_at: '2020-04-02T05:24:48.223Z',
            userInfo: {
              avatar: '/avatar/e26500fef320f06ab8a915e0a91a3333.png',
              name: 'cjiao100'
            }
          }
        ]
      }
    };

    this.search = this.search.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  cancelSearch() {
    this.props.navigation.goBack();
  }

  search() {
    if (this.state.search) {
      this.setState({
        goSearch: true
      });
    } else {
      toast('还没输入搜索内容呢');
    }
  }

  onChangeText(text) {
    this.setState({
      search: text
    });
  }

  toggleTab(key) {
    this.setState({
      showTab: key
    });
  }

  openPostDetails(post) {
    this.props.navigation.navigate('Post', {
      author: post.userInfo.name,
      postId: post._id,
      title: post.title
    });
  }

  openArticle(article) {
    this.props.navigation.navigate('Article', {
      articleId: article._id
    });
  }

  renderArticle(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.openArticle(item)}>
        <View style={articles.item}>
          <View>
            <Text numberOfLines={1} style={articles.itemTitle}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={articles.itemDesc}>
              {item.content
                .split(/<(?!img).*?>/gi)
                .join('')
                .replace(/<(img)[^>]*>/gi, '[图片]')
                .replace(/&lt;/gi, '<')
                .replace(/&gt;/gi, '>')}
            </Text>
          </View>
          <View style={articles.flexBox}>
            <Image
              style={articles.flexBox}
              source={{ uri: `${global.URI}${item.coverImage}` || null }}
            />
          </View>
          <View style={articles.itemStatus}>
            <View>
              <View style={articles.itemStatusTitle}>
                <Icon name="eye" size={20} />
                <Text style={articles.itemStatusNum}>{item.browse}</Text>
              </View>
            </View>
            <View>
              <View style={articles.itemStatusTitle}>
                <Icon name="comment" size={20} />
                <Text style={articles.itemStatusNum}>
                  {item.comment.length}
                </Text>
              </View>
            </View>
            <View>
              <View style={articles.itemStatusTitle}>
                <Icon name="like" size={20} />
                <Text style={articles.itemStatusNum}>
                  {item.awesome.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderPost(item) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#fafafa"
        key={item._id}
        style={posts.post}
        onPress={() => this.openPostDetails(item)}
        onLongPress={this.showModal}>
        <View>
          <View style={posts.post_header}>
            <View style={posts.post_header_left}>
              <Image
                style={posts.post_avatar}
                source={{
                  uri: `${global.URI}${item.userInfo.avatar}`
                }}
              />
              <View>
                <Text style={posts.post_author}>{item.userInfo.name}</Text>
                <Text style={posts.post_time}>{moment(item.created_at)}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={posts.post_title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={posts.post_content} numberOfLines={5}>
              {topic(item.content, item.topicList)}
            </Text>
          </View>
          <View style={posts.post_img_group}>
            {item.images.map((img, index) => (
              <Image
                key={index}
                style={posts.post_img}
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
      <View>
        <View style={styles.search}>
          <TextInput
            style={styles.search_input}
            placeholder="搜点什么?"
            onChangeText={this.onChangeText}
            onSubmitEditing={this.search}
          />
          <Text style={styles.search_text} onPress={this.cancelSearch}>
            取消
          </Text>
        </View>
        {/* {this.state.goSearch ? ( */}
        <View>
          <FlatList
            style={styles.tab}
            horizontal={true}
            data={[
              { value: '文章', key: 'article' },
              { value: '帖子', key: 'post' }
            ]}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.tab_item,
                  item.key === this.state.showTab ? styles.tab_item_active : ''
                ]}
                onPress={() => this.toggleTab(item.key)}>
                {item.value}
              </Text>
            )}
          />
          <FlatList
            data={this.state.result[this.state.showTab]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (this.state.showTab === 'article') {
                return this.renderArticle(item);
              } else if (this.state.showTab === 'post') {
                return this.renderPost(item);
              }
            }}
          />
        </View>
        {/* ) : ( */}
        {/* <></> */}
        {/* )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: color.primary_color,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  search_input: {
    flex: 1,
    backgroundColor: color.white_color,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  search_text: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 5,
    color: color.white_color
  },
  tab: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 10,
    paddingLeft: 15
  },
  tab_item: {
    color: color.white_color,
    paddingVertical: 10,
    marginRight: 30,
    fontSize: font.small_size
  },
  tab_item_active: {
    borderBottomWidth: 3,
    borderColor: color.white_color
  }
});

const articles = StyleSheet.create({
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

const posts = StyleSheet.create({
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
  }
});

export default Search;
