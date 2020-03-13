import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { color } from '../../assets/styles/theme';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={testStyle.container}>
        <View style={testStyle.word_content}>
          <Text style={testStyle.word}>gloom</Text>
          <Text style={testStyle.soundmark}>[ɡluːm]</Text>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableHighlight
            underlayColor="#f5f5f5"
            style={testStyle.selete_button}
            onPress={() => {}}>
            <Text style={testStyle.selete_item}>
              n.忧郁，沮丧；v.变忧郁，变忧愁
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#f5f5f5"
            style={testStyle.selete_button}
            onPress={() => {}}>
            <Text style={testStyle.selete_item}>n.腕部</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#f5f5f5"
            style={testStyle.selete_button}
            onPress={() => {}}>
            <Text style={testStyle.selete_item} numberOfLines={2}>
              n.（病人或减肥者的）特种饮食；日常饮食； v.节食；n.大量
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#f5f5f5"
            style={testStyle.selete_button}
            onPress={() => {}}>
            <Text style={testStyle.selete_item}>vt.积攒，积累</Text>
          </TouchableHighlight>
        </View>
        <View style={testStyle.bottom_content}>
          <TouchableHighlight>
            <Text style={testStyle.bottom_buttom}>提示</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={testStyle.bottom_buttom}>下一个</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={testStyle.bottom_buttom}>收藏</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const testStyle = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  word_content: {
    height: 260,
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
