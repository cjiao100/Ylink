import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { requestWithToken } from '../../utils/request';
import moment from '../../utils/moment';
import { color } from '../../assets/styles/theme';
import { View, Text, ScrollView } from 'react-native';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.route.params.articleId,
      article: {
        __v: 1,
        _id: '5e3267858204d7358c4750a5',
        awesome: ['5e3ed27dbd45af16cd795e0d'],
        browse: [],
        comment: [
          '5e46562642f72a164d6f8dba',
          '5e4656e52e9d54179a1abddf',
          '5e467840587a832d44a80150'
        ],
        content: '这是内容',
        coverImage: '',
        created_at: '2020-02-12T12:57:39.008Z',
        title: '123',
        userId: '5e317e00e7b79232287bc62a',
        video: ''
      }
    };
  }

  componentDidMount() {
    this.getArticle();
    this.getComment();
  }

  getComment() {
    requestWithToken({
      url: `/article/${this.state.articleId}/commenr/list`,
      method: 'Get'
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getArticle() {
    requestWithToken({
      url: `/article/${this.state.articleId}`,
      method: 'Get'
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          article: err
        });
      });
  }

  render() {
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
                  .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background: #fff;
                    box-shadow: 1px 0px 0 1px #eee;
                    width: 100%;
                    height: 50px;
                    line-height: 50px
                  }
                  .column {
                    display: inline-block;
                    width: 49%;
                    text-align: center
                  }
                </style>
              </head>

              <body>
                <div>
                  <h1 class="title">${this.state.article.title}</h1>
                  <p class="date">
                    ${moment(this.state.article.created_at)} · 
                    ${this.state.article.browse.length}浏览
                  </p>
                  <p class="content">
                    ${
                      this.state.article.content
                    }浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览浏览
                  </p>
                <div>
                <div class="footer">
                  <div class="column">收藏</div>
                  <div class="column">点赞
                  ${this.state.article.awesome.length}
                  </div>
                </div>
              </body>
            </html>
            `
          }}
        />
      </>
    );
  }
}

export default Article;
