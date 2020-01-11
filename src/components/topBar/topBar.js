import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTag: 1
    };
    this.toggleTag = this.toggleTag.bind(this);
  }

  toggleTag(tag) {
    console.log(tag);
    this.setState({
      currentTag: tag.key
    });
  }

  render() {
    return (
      <View>
        <View style={barStyle.bar_container}>
          <View style={barStyle.bar_icon}>
            <Text style={barStyle.bar_iconText}>英领</Text>
          </View>
          <View style={barStyle.bar_search}>
            <TextInput style={barStyle.bar_searchInput} />
          </View>
          <View style={barStyle.bar_icon}>
            <Text style={barStyle.bar_iconText}>计划</Text>
          </View>
        </View>
        <View style={barStyle.bar_tagGroup}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={[
              { value: '关注', key: 0 },
              { value: '推荐', key: 1 },
              { value: '科技', key: 2 },
              { value: '时尚', key: 3 },
              { value: '影视', key: 4 },
              { value: '游戏', key: 5 },
              { value: '时事', key: 6 },
              { value: '娱乐', key: 7 },
              { value: '历史', key: 8 }
            ]}
            renderItem={({ item }) => {
              const tagStyle =
                item.key === this.state.currentTag
                  ? StyleSheet.flatten([
                      barStyle.bar_tag,
                      barStyle.bar_tagActive
                    ])
                  : barStyle.bar_tag;
              const tagTextStyle =
                item.key === this.state.currentTag
                  ? StyleSheet.flatten([
                      barStyle.bar_tagText,
                      barStyle.bar_tagTextActive
                    ])
                  : barStyle.bar_tagText;
              return (
                <TouchableWithoutFeedback onPress={() => this.toggleTag(item)}>
                  <View style={tagStyle}>
                    <Text style={tagTextStyle}>{item.value}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const barStyle = StyleSheet.create({
  bar_container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    paddingTop: 10,
    paddingBottom: 10
  },
  bar_search: {
    flex: 1
  },
  bar_searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20
  },
  bar_icon: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  bar_iconText: {
    lineHeight: 30
  },
  bar_tagGroup: {
    paddingLeft: 10
  },
  bar_tag: {
    marginRight: 20,
    backgroundColor: '#EEEEEE',
    padding: 5,
    borderRadius: 5
  },
  bar_tagActive: {
    backgroundColor: '#E91B36'
  },
  bar_tagText: {
    letterSpacing: 5,
    color: '#8E8E8E',
    fontSize: 12
  },
  bar_tagTextActive: {
    color: '#FFFFFF'
  }
});

export default TopBar;
