import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { requestWithToken } from '../../utils/request';
import moment from '../../utils/moment';
import { color, font } from '../../assets/styles/theme';
import { ActivityIndicator } from 'react-native';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.route.params.articleId,
      article: {}
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
    if (Object.keys(this.state.article).length === 0) {
      return <ActivityIndicator />;
    } else {
      return (
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
                      margin-top: 40px;
                      border-top: 1px solid ${color.bg_info_color};
                      padding-top: 40px;
                      background: #fff;
                      width: 100%;
                      text-align: center;
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
                      ${this.state.article.content}
                    </p>
                    <div class="footer">
                      <div class="column">点赞</div>
                      <p class="column_num">
                        ${this.state.article.awesome.length}
                      </p>
                    </div>
                  <div>
                </body>
              </html>
              `
          }}
        />
      );
    }
  }
}

export default Article;
