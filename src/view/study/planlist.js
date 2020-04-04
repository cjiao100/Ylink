import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions,
  StyleSheet
} from 'react-native';
import * as Progress from 'react-native-progress';
import toast from '../../utils/toast';
import { requestWithToken } from '../../utils/request';
import { color, font } from '../../assets/styles/theme';
import SpliteLine from '../../components/spliteLine/spliteLine';

const { width } = Dimensions.get('window');

class PlanList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planList: []
    };

    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.getPlanList();
  }

  getPlanList() {
    requestWithToken({
      url: '/plan/list',
      method: 'Get'
    })
      .then(res => {
        console.log(res);

        this.setState({
          planList: res.data
        });
      })
      .catch(err => {
        toast('获取列表失败了');
        console.warn(err);
      });
  }

  selectPlan(planId) {
    console.log(planId);
    requestWithToken({
      url: `/plan/select/${planId}`,
      method: 'Post'
    })
      .then(res => {
        console.log(res);
        // this.getPlanList();
        toast('选择计划成功,快去学习吧');
      })
      .catch(err => {
        console.log(err);
      });
  }

  _renderItem({ item, index, separators }) {
    return (
      <TouchableHighlight
        onPress={() => this.selectPlan(item._id)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}>
        <View style={styles.plan}>
          <Text style={styles.plan_name}>{item.name}</Text>
          <View>
            {item.userPlan.length === 0 ? (
              <Text style={styles.plan_not_block}>
                <Text style={styles.plan_not_text}>{item.wordList.length}</Text>
                词{'  '}暂未开始
              </Text>
            ) : (
              <View style={styles.plan_block}>
                <View style={styles.plan_progress}>
                  <Progress.Bar
                    height={5}
                    progress={
                      item.userPlan[0].completeList.length /
                        item.wordList.length || 0
                    }
                    color={color.primary_color}
                    borderWidth={1}
                    width={null}
                  />
                </View>
                <Text style={styles.plan_text}>
                  <Text style={{ color: color.primary_color }}>
                    {item.userPlan[0].completeList.length}
                  </Text>{' '}
                  / {item.wordList.length}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.planList}
        keyExtractor={item => item._id}
        refreshing={true}
        ItemSeparatorComponent={() => (
          <SpliteLine lineHeight={2} color={color.bg_info_color} />
        )}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  plan: {
    backgroundColor: 'white',
    padding: 10
  },
  plan_name: {
    fontSize: font.primary_size,
    fontWeight: 'bold'
  },
  plan_not_block: {
    fontSize: font.small_size
  },
  plan_not_text: {
    marginHorizontal: 5,
    color: color.primary_color
  },
  plan_block: {
    display: 'flex',
    flexDirection: 'row'
  },
  plan_progress: {
    flex: 1,
    justifyContent: 'center'
  },
  plan_text: {
    fontSize: font.small_size,
    minWidth: width * 0.15,
    textAlign: 'center'
  }
});

export default PlanList;
