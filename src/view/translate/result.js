import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { font, color } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import Toast from '../../utils/toast';

class Result extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.route;
    // console.log(this.props.route);

    this.state = {
      loading: true,
      word: params.word,
      wordInfo: {}
    };
    this.addWordBook = this.addWordBook.bind(this);
  }

  componentDidMount() {
    const { word = 'Hello' } = this.props.route.params;
    requestWithToken({
      url: '/translate',
      method: 'Post',
      data: { query: word }
    })
      .then(res => {
        // console.log(res);
        this.setState({
          wordInfo: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        Toast('查询失败');
      });
  }

  addWordBook() {
    const { _id } = this.state.wordInfo;
    // console.log(_id);
    requestWithToken({
      url: '/wordbook/add',
      method: 'Post',
      data: { wordId: _id }
    })
      .then(res => {
        const wordInfo = { ...this.state.wordInfo };
        wordInfo.wordbook = true;
        this.setState({ wordInfo });
        Toast('添加成功');
      })
      .catch(err => {
        console.info(err);
        Toast('添加失败');
      });
  }

  // 首字母大写
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={resultStyle.container}>
          <View style={resultStyle.header}>
            <Text style={resultStyle.word}>
              {this.Capitalize(this.state.wordInfo.query)}
            </Text>
            {this.state.wordInfo.wordbook ? (
              <></>
            ) : (
              <TouchableHighlight style={resultStyle.add} activeOpacity={0.9}>
                <Text onPress={this.addWordBook} style={resultStyle.addText}>
                  加入单词本
                </Text>
              </TouchableHighlight>
            )}
          </View>
          <View style={resultStyle.phonetic}>
            <View style={resultStyle.phonetic_space}>
              <Text>
                英{'  '}
                <Text style={resultStyle.phonetic_color}>
                  [{this.state.wordInfo.basic['uk-phonetic']}]
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                美{'  '}
                <Text style={resultStyle.phonetic_color}>
                  [{this.state.wordInfo.basic['us-phonetic']}]
                </Text>
              </Text>
            </View>
          </View>
          <View style={resultStyle.top_space}>
            {this.state.wordInfo.basic.explains.map(item => (
              <Text key={item} style={resultStyle.transate}>
                <Text style={resultStyle.transate_part}>
                  {item.slice(0, item.indexOf('.') + 1)}
                </Text>
                <Text>{item.slice(item.indexOf('.') + 1)}</Text>
              </Text>
            ))}
          </View>
          <View style={resultStyle.dividing} />
          <View>
            <Text style={resultStyle.weba}>网络词汇</Text>
            <View>
              {this.state.wordInfo.web.map((item, index) => (
                <View style={resultStyle.bottom_space} key={index}>
                  <View style={resultStyle.web_translate}>
                    <Text>
                      {index + 1}.{'  '}
                    </Text>
                    <Text style={resultStyle.web_translate_style}>
                      {item.key}
                    </Text>
                  </View>
                  <Text style={resultStyle.web_translate_list}>
                    {item.value.map(i => `${i}；`)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={resultStyle.dividing} />
        </View>
      );
    }
  }
}

const resultStyle = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  add: {
    backgroundColor: color.primary_color,
    padding: 5,
    borderRadius: 5
  },
  addText: {
    color: color.white_color,
    fontSize: font.small_size
  },
  word: {
    fontSize: font.big_size,
    fontWeight: 'bold'
  },
  phonetic: {
    display: 'flex',
    flexDirection: 'row'
  },
  phonetic_space: {
    marginRight: 20
  },
  phonetic_color: {
    color: color.info_color
  },
  top_space: {
    marginTop: 20
  },
  bottom_space: {
    marginBottom: 15
  },
  transate: {
    marginBottom: 15,
    fontSize: font.primary_size
  },
  transate_part: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  dividing: {
    marginHorizontal: -5,
    marginVertical: 10,
    backgroundColor: color.primary_color,
    height: 3,
    borderRadius: 50
  },
  web: {
    fontWeight: 'bold',
    fontSize: font.primary_size,
    marginBottom: 10
  },
  web_translate: {
    display: 'flex',
    flexDirection: 'row'
  },
  web_translate_style: {
    fontSize: font.primary_size,
    color: '#966B30'
  },
  web_translate_list: {
    color: color.info_color,
    fontSize: font.small_size,
    marginLeft: 18
  }
});

export default Result;
