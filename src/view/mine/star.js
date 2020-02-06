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
    this.loadData = this.loadData.bind(this);
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

  loadData() {
    // const data = this.state.data;
    // const length = data.length;
    // if (length < 100) {
    //   this.setState({
    //     data: data.concat({
    //       id: length,
    //       title: '四川省首例新型冠状病毒感染的肺炎病例痊愈出院',
    //       browse: '200',
    //       awesome: '1414',
    //       author: '小可爱',
    //       createTime: '2019-02-10',
    //       updateTime: '2019-02-10'
    //     })
    //   });
    // }
    // console.log(JSON.stringify(data));
  }

  render() {
    return (
      <View>
        <View style={starStyle.tabbar}>
          <View
            style={
              this.state.current === 'post' ? starStyle.tabbar_active : ''
            }>
            <Text style={starStyle.tabbar_text}>帖子</Text>
          </View>
          <View
            style={[
              starStyle.tabbar_next,
              this.state.current === 'column' ? starStyle.tabbar_active : ''
            ]}>
            <Text style={starStyle.tabbar_text}>专栏</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
            onEndReached={() => {
              this.loadData();
            }}
          />
        </View>
      </View>
    );
  }
}

const starStyle = StyleSheet.create({
  tabbar: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    paddingLeft: 30,
    backgroundColor: color.primary_color
  },
  tabbar_text: {
    color: color.white_color,
    fontSize: font.primary_size
  },
  tabbar_next: {
    marginLeft: 20
  },
  tabbar_active: {
    borderBottomWidth: 2,
    borderColor: color.white_color
  },
  listItem: {
    padding: 15,
    borderColor: color.bg_info_color,
    borderBottomWidth: 1.5
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
