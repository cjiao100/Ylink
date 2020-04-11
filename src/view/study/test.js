import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import toast from '../../utils/toast';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problem: {}
    };
  }

  componentDidMount() {
    this.getInitWordProblem();
  }

  getInitWordProblem() {
    requestWithToken({
      url: '/test/',
      mesthod: 'Get'
    })
      .then(res => {
        this.setState({
          problem: res.data
        });
      })
      .catch(err => {
        console.warn(err);
        toast('获取失败');
      });
  }

  nextWordProblem(answer) {
    const result = answer.index === 1;
    requestWithToken({
      url: `/test/result/${this.state.problem.wordId}`,
      method: 'Post',
      data: {
        result
      }
    }).then(() => {
      this.getInitWordProblem();
    });
  }

  render() {
    if (!this.state.problem) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="check-circle" size={50} color={color.primary_color} />
          <Text style={{ fontSize: font.big_size }}>计划完成</Text>
        </View>
      );
    } else if (Object.keys(this.state.problem).length === 0) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={testStyle.container}>
          <View style={testStyle.word_content}>
            <Text style={testStyle.word}>{this.state.problem.question}</Text>
            <Text style={testStyle.soundmark}>
              [{this.state.problem.phonetic}]
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            {this.state.problem.answer.map(answer => (
              <TouchableHighlight
                underlayColor="#f5f5f5"
                style={testStyle.selete_button}
                onPress={() => this.nextWordProblem(answer)}>
                <Text numberOfLines={2} style={testStyle.selete_item}>
                  {answer.value}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
          <View style={testStyle.bottom_content}>
            <TouchableHighlight>
              <Text style={testStyle.bottom_buttom}>提示</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={testStyle.bottom_buttom}>收藏</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

const testStyle = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  word_content: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  word: {
    fontSize: 45,
    color: color.primary_color,
    fontWeight: 'bold'
  },
  soundmark: {
    color: color.info_color
  },
  selete_button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 0.5
  },
  selete_item: {
    fontSize: 16
  },
  bottom_content: {
    height: 30,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  bottom_buttom: {
    color: color.info_color,
    borderBottomWidth: 1,
    borderBottomColor: color.primary_color
  }
});

export default Test;
