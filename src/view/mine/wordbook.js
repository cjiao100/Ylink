import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { font, color } from '../../assets/styles/theme';

class Wordbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordList: [
        {
          id: '0',
          word: 'hello',
          explains: [
            'int. 喂；哈罗，你好，您好',
            'n. 表示问候， 惊奇或唤起注意时的用语',
            'n. (Hello) 人名；（法）埃洛'
          ]
        }
      ]
    };

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return (
      <View style={wordStyle.word_container}>
        <Text style={wordStyle.word_title}>{item.word}</Text>
        <Text numberOfLines={1} style={wordStyle.word_translate}>
          {item.explains.map(explain => (
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
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.wordList}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const wordStyle = StyleSheet.create({
  word_container: {
    padding: 15,
    borderBottomWidth: 1.5,
    borderColor: color.bg_info_color
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
