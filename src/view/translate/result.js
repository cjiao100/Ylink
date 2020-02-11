import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: font.big_size, fontWeight: 'bold' }}>
          {this.state.wordInfo.query}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ marginRight: 20 }}>
            <Text>
              英{'  '}
              <Text style={{ color: color.info_color }}>
                [{this.state.wordInfo.basic['uk-phonetic']}]
              </Text>
            </Text>
          </View>
          <View>
            <Text>
              美{'  '}
              <Text style={{ color: color.info_color }}>
                [{this.state.wordInfo.basic['us-phonetic']}]
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {this.state.wordInfo.basic.explains.map(item => (
            <Text
              key={item}
              style={{ marginBottom: 15, fontSize: font.primary_size }}>
              <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {item.slice(0, item.indexOf('.') + 1)}
              </Text>
              <Text>{item.slice(item.indexOf('.') + 1)}</Text>
            </Text>
          ))}
        </View>
        <View
          style={{
            marginHorizontal: -5,
            marginVertical: 10,
            backgroundColor: color.primary_color,
            height: 3,
            borderRadius: 50
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: font.primary_size,
              marginBottom: 10
            }}>
            网络词汇
          </Text>
          <View>
            {this.state.wordInfo.web.map((item, index) => (
              <View style={{ marginBottom: 15 }} key={index}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text>
                    {index + 1}.{'  '}
                  </Text>
                  <Text
                    style={{ fontSize: font.primary_size, color: '#966B30' }}>
                    {item.key}
                  </Text>
                </View>
                <Text
                  style={{
                    color: color.info_color,
                    fontSize: font.small_size,
                    marginLeft: 18
                  }}>
                  {item.value.map(i => `${i}；`)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            marginHorizontal: -5,
            marginVertical: 10,
            backgroundColor: color.primary_color,
            height: 3,
            borderRadius: 50
          }}
        />
      </View>
    );
  }
}

export default Result;
