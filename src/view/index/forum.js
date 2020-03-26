import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import TopBar from '../../components/topBar/topBar';
import { color, font } from '../../assets/styles/theme';

const { width } = Dimensions.get('window');

class forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      hotList: ['新型冠状病毒肺炎疫情', '想见你', '疫情辟谣', '李子维'],
      postList: [
        {
          id: 1,
          author: '共青团中央',
          data: '17分钟前',
          title: '武汉市新冠肺炎疫情防控指挥部通告',
          content:
            '武汉市新冠肺炎疫情防控指挥部发布的《关于加强进出武汉市车辆和人员管理的通告》(第17号)，系市指挥部下设的交通防控组未经指挥部研究和主要领导同志同意发布的，现宣布该通告无效。对此，我们对相关人员进行了严肃的批评处理。武汉市坚决贯彻习近平总书记关于“外防输出”的重要指示精神，牢固树立全国一盘棋的思想，严格离汉通道管理，严格人员管控，严防疫情向外输出。\n 特此通告\n 武汉市新冠肺炎疫情防控指挥部 \n 2020年2月24日',
          img: []
        },
        {
          id: 2,
          author: '共青团中央',
          data: '17分钟前',
          title: '武汉市新冠肺炎疫情防控指挥部通告',
          content:
            '武汉市新冠肺炎疫情防控指挥部发布的《关于加强进出武汉市车辆和人员管理的通告》(第17号)，系市指挥部下设的交通防控组未经指挥部研究和主要领导同志同意发布的，现宣布该通告无效。对此，我们对相关人员进行了严肃的批评处理。武汉市坚决贯彻习近平总书记关于“外防输出”的重要指示精神，牢固树立全国一盘棋的思想，严格离汉通道管理，严格人员管控，严防疫情向外输出。\n 特此通告\n 武汉市新冠肺炎疫情防控指挥部 \n 2020年2月24日',
          img: ['1', '2']
        }
      ]
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openPostDetails = this.openPostDetails.bind(this);
  }

  showModal() {
    this.setState({
      modalVisible: true
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  openPostDetails(post) {
    this.props.navigation.navigate('Post', {
      author: post.author,
      postId: post.id,
      title: post.title
    });
  }

  render() {
    const length = this.state.hotList.length;
    const leftList = this.state.hotList.slice(0, Math.ceil(length / 2));
    const rightList = this.state.hotList.slice(Math.ceil(length / 2), length);
    return (
      <>
        <TopBar />
        <ScrollView>
          <View style={forumStyle.container}>
            <View style={forumStyle.hot_content}>
              <Text style={forumStyle.hot_title}>热门话题</Text>
              <View style={forumStyle.hot_list}>
                <View style={forumStyle.hot_left_and_right}>
                  {leftList.map((item, index) => (
                    <Text key={index} style={{ width: width / 2 }}>
                      #{item}#
                    </Text>
                  ))}
                </View>
                <View style={forumStyle.hot_left_and_right}>
                  {rightList.map((item, index) => (
                    <Text key={index} style={{ width: width / 2 }}>
                      #{item}#
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {/* 帖子 */}
            {this.state.postList.map(item => (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="#fafafa"
                key={item.id}
                style={forumStyle.post}
                onPress={() => this.openPostDetails(item)}
                onLongPress={this.showModal}>
                <View>
                  <View style={forumStyle.post_header}>
                    <View style={forumStyle.post_header_left}>
                      <Image style={forumStyle.post_avatar} />
                      <View>
                        <Text style={forumStyle.post_author}>
                          {item.author}
                        </Text>
                        <Text style={forumStyle.post_time}>{item.data}</Text>
                      </View>
                    </View>
                    <Text onPress={this.showModal}>更多操作</Text>
                  </View>
                  <View>
                    <Text style={forumStyle.post_title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={forumStyle.post_content} numberOfLines={5}>
                      {item.content}
                    </Text>
                  </View>
                  <View style={forumStyle.post_img_group}>
                    {item.img.map((img, index) => (
                      <Image key={index} style={forumStyle.post_img} />
                    ))}
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}>
          <View style={forumStyle.modal}>
            <View style={forumStyle.other_button}>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>收藏</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>举报</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={() => {}}>
                <Text>不感兴趣</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                style={forumStyle.modal_button}
                underlayColor="#f5f5f5"
                onPress={this.closeModal}>
                <Text style={forumStyle.cancel_button}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const forumStyle = StyleSheet.create({
  container: {
    backgroundColor: color.bg_info_color,
    flex: 1
  },
  hot_content: {
    padding: 20,
    backgroundColor: color.white_color,
    marginTop: 10
  },
  hot_title: {
    fontWeight: 'bold'
  },
  hot_list: {
    display: 'flex',
    flexDirection: 'row'
  },
  hot_left_and_right: {
    padding: 10
  },
  post: {
    marginTop: 10,
    backgroundColor: color.white_color,
    padding: 15
  },
  post_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  post_header_left: {
    flexDirection: 'row'
  },
  post_avatar: {
    backgroundColor: color.info_color,
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50
  },
  post_author: {
    fontSize: font.primary_size,
    marginTop: 8
  },
  post_time: {
    color: color.info_color,
    fontSize: font.small_size
  },
  post_title: {
    fontSize: font.primary_size,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  post_content: {
    lineHeight: 20,
    color: '#101010'
  },
  post_img_group: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
    // justifyContent: 'space-between'
  },
  post_img: {
    backgroundColor: color.bg_info_color,
    height: 100,
    width: 100,
    marginRight: 15
  },
  modal: {
    backgroundColor: color.bg_info_color,
    position: 'absolute',
    bottom: 0,
    width: width
  },
  modal_button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.bg_info_color,
    backgroundColor: color.white_color
  },
  other_button: {
    marginBottom: 10
  },
  cancel_button: {
    textAlign: 'center'
  }
});

export default forum;