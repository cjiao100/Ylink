import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { color, font } from '../../assets/styles/theme';

class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'post',
      data: [
        {
          id: '0',
          title: '四川省首例新型冠状病毒感染的肺炎病例痊愈出院',
          browse: '200',
          awesome: '1414',
          author: '小可爱',
          createTime: '2019-02-10',
          updateTime: '2019-02-10'
        }
      ]
    };

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return (
      <View style={starStyle.listItem}>
        <Text>{item.title}</Text>
        <View style={starStyle.listItem_info}>
          <View style={starStyle.listItem_num}>
            <Text style={starStyle.listItem_text}>{item.browse} 浏览</Text>
            <Text style={[starStyle.listItem_text, starStyle.listItem_next]}>
              {item.awesome} 赞同
            </Text>
          </View>
          <Text style={starStyle.listItem_text}>{item.author}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const starStyle = StyleSheet.create({
  listItem: {
    padding: 15,
    borderColor: color.bg_info_color,
    borderBottomWidth: 1.5,
    backgroundColor: color.white_color
  },
  listItem_info: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  listItem_num: {
    flex: 1,
    flexDirection: 'row'
  },
  listItem_text: {
    color: color.info_color,
    fontSize: font.small_size
  },
  listItem_next: {
    marginLeft: 10
  }
});

export default Star;
