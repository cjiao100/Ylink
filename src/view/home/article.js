import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { requestWithToken } from '../../utils/request';
import moment from '../../utils/moment';
import { color, font } from '../../assets/styles/theme';
import {
  ActivityIndicator,
  View,
  TextInput,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import toast from '../../utils/toast';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.route.params.articleId,
      article: {},
      comment: [],
      commentValue: '',
      inputVisible: false
    };

    this.submitComment = this.submitComment.bind(this);
    this.awesome = this.awesome.bind(this);
    this.articleBrower = this.articleBrower.bind(this);
  }

  componentDidMount() {
    this.getArticle();
    this.getComment();
    this.articleBrower();
  }

  getComment() {
    requestWithToken({
      url: `/article/${this.state.articleId}/comment/list`,
      method: 'Get'
    })
      .then(res => {
        this.setState({
          comment: res.data
        });
      })
      .catch(err => {
        console.info(err);
        toast('获取失败');
      });
  }

  getArticle() {
    requestWithToken({
      url: `/article/${this.state.articleId}`,
      method: 'Get'
    })
      .then(res => {
        this.setState({
          article: res.data
        });
      })
      .catch(err => {
        console.log(err);
        toast('文章获取失败');
      });
  }

  submitComment() {
    this.setState({ inputVisible: false });
    const comment = this.state.commentValue;
    requestWithToken({
      url: `/article/${this.state.articleId}/comment`,
      method: 'Post',
      data: {
        content: comment
      }
    })
      .then(res => {
        toast('发布评论成功');
        this.getComment();
        // console.log(res);
      })
      .catch(err => {
        toast('发布失败,请重试');
        console.warn(err);
      });
  }

  awesome() {
    requestWithToken({
      url: `/article/${this.state.article._id}/awesome`,
      method: 'Put'
    })
      .then(res => {
        if (this.state.article.current.awesome) {
          toast('取消点赞(>_<)');
        } else {
          toast('点赞成功(^▽^)');
        }
        this.getArticle();
      })
      .catch(err => {
        console.warn(err);
        toast('点赞失败');
      });
  }

  articleBrower() {
    requestWithToken({
      url: `/article/${this.props.route.params.articleId}/browse`,
      method: 'Put'
    })
      .then(res => {
        console.log('浏览');
      })
      .catch(err => {
        console.warn(err);
      });
  }

  renderComment(item) {
    return `
      <li class="comment_item">
        <div>
          <img class="avatar" src="${global.URI}${item.userId.avatar}" />
        </div>
        <div>
          <p class="comment_author">${item.userId.name}</p>
          <p class="comment_time">${moment(item.created_at)}</p>
          <p class="comment_content">${item.content}</p>
        </div>
      </li>`;
  }

  render() {
    if (Object.keys(this.state.article).length === 0) {
      return <ActivityIndicator />;
    } else {
      return (
        <>
          <WebView
            androidHardwareAccelerationDisabled={true}
            originWhitelist={['*']}
            source={{
              html: `
                <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    html,body {
                      background-color: ${color.white_color}
                    }
                    .title {
                      margin: 0
                    }
                    .date {
                      margin: 0;
                      font-size: 12px;
                      color: ${color.info_color}
                    }
                    .content {
                      margin: 10px 0;
                      text-indent: 2em;
                      font-size: 15px;
                      line-height: 2;
                    }
                    .awesome {
                      margin-top: 40px;
                      border-top: 1px solid ${color.bg_info_color};
                      padding-top: 40px;
                      background: #fff;
                      width: 100%;
                      text-align: center;
                    }
                    .footer {
                      position: fixed;
                      bottom: 0;
                      left: 0
                    }
                    .column {
                      height: 50px;
                      width: 50px;
                      color: ${color.white_color};
                      display: inline-block;
                      text-align: center;
                      background-color: ${color.primary_color};
                      // padding: 15px;
                      border-radius: 50%;
                      line-height: 50px;
                      opacity: 0.6
                    }
                    .column_num {
                      margin: 5px 0;
                      color: ${color.info_color};
                      font-size: ${font.small_size}
                    }
                    .comment {
                      list-style: none;
                      padding: 0;
                      margin-top: 20px;
                      border-top :1px solid ${color.bg_info_color}
                    }
                    .comment_item {
                      padding: 10px;
                      margin-bottom: 20px;
                      display: flex;
                      border-bottom: 1px solid ${color.bg_info_color}
                    }
                    .avatar {
                      width: 40px;
                      height: 40px;
                      margin-right: 10px;
                    }
                    .comment_author {
                      font-size: ${font.primary_size}px;
                      font-weight: bold;
                      margin-top: 5px;
                      margin-bottom: 5px;
                    }
                    .comment_time {
                      font-size: ${font.small_size}px;
                      color: ${color.info_color};
                      margin-top: 0;
                      margin-bottom: 10px;
                    }
                    .comment_content {
                      font-size: ${font.primary_size}px;
                      margin: 0
                    }
                  </style>
                </head>
  
                <body>
                  <div>
                    <h1 class="title">${this.state.article.title}</h1>
                    <p class="date">
                      ${moment(this.state.article.created_at)} · 
                      ${this.state.article.browse}浏览
                    </p>
                    <p class="content">
                      ${this.state.article.content}
                    </p>
                    <ul class="comment">
                      ${this.state.comment
                        .map(item => this.renderComment(item))
                        .join(' ')}
                    </ul>
                  <div>
                </body>
              </html>
              `
            }}
          />
          <View style={styles.footer}>
            <Text
              onPress={() => {
                this.setState({ inputVisible: true });
              }}
              style={styles.bottom_input}>
              评论一下吧
            </Text>
            <View style={styles.awesome}>
              <Text
                style={[
                  styles.awesome_text,
                  this.state.article.current.awesome
                    ? {
                        color: color.primary_color,
                        backgroundColor: color.white_color
                      }
                    : {}
                ]}
                onPress={this.awesome}>
                点赞
              </Text>
            </View>
          </View>

          <Modal visible={this.state.inputVisible} transparent={true}>
            <View style={styles.modal_view}>
              <Text
                onPress={() => {
                  this.setState({ inputVisible: false });
                }}
                style={styles.modal_block}>
                123
              </Text>
              <View style={styles.modal_input_block}>
                <TextInput
                  placeholder="说点什么"
                  autoFocus={true}
                  style={styles.modal_input}
                  onChangeText={text => this.setState({ commentValue: text })}
                />
                <TouchableOpacity
                  disabled={this.state.commentValue === ''}
                  onPress={this.submitComment}>
                  <Text style={styles.modal_button}>发布</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  awesome: {
    position: 'relative',
    width: 60
  },
  awesome_text: {
    position: 'absolute',
    backgroundColor: color.bg_info_color,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: color.white_color,
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
    top: -25,
    right: 0,
    elevation: 1
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: color.white_color,
    elevation: 10
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

export default Article;
