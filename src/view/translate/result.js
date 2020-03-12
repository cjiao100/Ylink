import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { font, color } from '../../assets/styles/theme';

class Result extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state = {
      word: params.word,
      wordInfo: {
        query: 'Hello',
        translation: ['你好'],
        web: [
          {
            value: ['你好', '您好', '哈啰', '喂'],
            key: 'Hello'
          },
          {
            value: ['凯蒂猫', '昵称', '吉蒂猫', '匿称'],
            key: 'Hello Kitty'
          },
          {
            value: ['哈乐哈乐', '乐扣乐扣'],
            key: 'Hello Bebe'
          }
        ],
        basic: {
          exam_type: ['初中'],
          'us-phonetic': 'helˈō',
          phonetic: 'həˈləʊ',
          'uk-phonetic': 'həˈləʊ',
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=hello&langType=en&sign=4312EB9371C2B11EBE11E579EC085410&salt=1581170411796&voice=5&format=mp3&appKey=00df5ceb8844dd7a',
          explains: [
            'int. 喂；哈罗，你好，您好',
            'n. 表示问候， 惊奇或唤起注意时的用语',
            'n. (Hello) 人名；（法）埃洛'
          ],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=hello&langType=en&sign=4312EB9371C2B11EBE11E579EC085410&salt=1581170411796&voice=6&format=mp3&appKey=00df5ceb8844dd7a'
        }
      }
    };
  }

  render() {
    return (
      <View style={resultStyle.container}>
        <Text style={resultStyle.word}>{this.state.wordInfo.query}</Text>
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

const resultStyle = StyleSheet.create({
  container: {
    padding: 20
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
