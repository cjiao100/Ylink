import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import { font, color } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';

class Wordbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordList: [],
      loading: true,
      pageNum: 0,
      pageSize: 20
    };

    this.renderItem = this.renderItem.bind(this);
    this.loadData = this.loadData.bind(this);
    this.openDetails = this.openDetails.bind(this);
  }

  componentDidMount() {
    this.getWordBookList().then(res => {
      this.setState({
        wordList: res.data,
        loading: false
      });
    });
  }

  getWordBookList() {
    const { pageNum, pageSize } = this.state;
    return requestWithToken({
      url: '/wordbook',
      method: 'Get',
      params: {
        pageNum,
        pageSize
      }
    }).catch(err => {
      console.info(err);
    });
  }

  openDetails(word) {
    this.props.navigation.navigate('Result', { word: word.query });
  }

  loadData() {
    this.setState(
      {
        pageNum: this.state.pageNum + 1
      },
      () => {
        this.getWordBookList().then(res => {
          const wordList = [...this.state.wordList];
          wordList.push(...res.data);
          this.setState({
            wordList
          });
        });
      }
    );
  }

  // 首字母大写
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderItem(item) {
    return (
      <TouchableNativeFeedback
        onPress={() => this.openDetails(item)}
        background={TouchableNativeFeedback.Ripple(color.bg_info_color, true)}>
        <View style={wordStyle.word_container}>
          <Text style={wordStyle.word_title}>
            {this.Capitalize(item.query)}
          </Text>
          <Text numberOfLines={1} style={wordStyle.word_translate}>
            {item.basic.explains.map(explain => (
              <Text key={explain}>
                <Text style={wordStyle.word_part}>
                  {explain.slice(0, explain.indexOf('.') + 1)}
                </Text>
                {explain.slice(explain.indexOf('.') + 1)}
                <Text>{'    '}</Text>
              </Text>
            ))}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
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
        <View>
          <FlatList
            data={this.state.wordList}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item._id}
            onEndReached={() => {
              this.loadData();
            }}
          />
        </View>
      );
    }
  }
}

const wordStyle = StyleSheet.create({
  word_container: {
    padding: 15,
    borderBottomWidth: 1.5,
    borderColor: color.bg_info_color,
    backgroundColor: color.white_color
  },
  word_title: {
    fontSize: font.big_size,
    fontWeight: 'bold'
  },
  word_translate: {
    fontSize: font.small_size,
    color: color.info_color
  },
  word_part: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});

export default Wordbook;
