import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import toast from '../../utils/toast';

class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'post',
      data: []
    };

    this.renderItem = this.renderItem.bind(this);
    this.getStarList = this.getStarList.bind(this);
  }

  componentDidMount() {
    this.getStarList();
  }

  getStarList() {
    requestWithToken({
      url: '/post//list/star',
      method: 'Get'
    })
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
        toast('获取失败');
      });
  }

  renderItem(item) {
    return (
      <View style={starStyle.listItem}>
        <Text>{item.post.title}</Text>
        <View style={starStyle.listItem_info}>
          <View style={starStyle.listItem_num}>
            <Text style={starStyle.listItem_text}>{item.post.browse} 浏览</Text>
            <Text style={[starStyle.listItem_text, starStyle.listItem_next]}>
              {item.postInfo.awesome} 赞同
            </Text>
          </View>
          <Text style={starStyle.listItem_text}>{item.user.name}</Text>
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
