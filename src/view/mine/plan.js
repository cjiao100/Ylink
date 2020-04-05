import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import SpliteLine from '../../components/spliteLine/spliteLine';
import { color, font } from '../../assets/styles/theme';
import { requestWithToken } from '../../utils/request';
import toast from '../../utils/toast';

const { width } = Dimensions.get('window');

class MyPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planList: []
    };
  }

  componentDidMount() {
    this.getPlanList();
  }

  getPlanList() {
    requestWithToken({
      url: '/plan/list/my',
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

  _renderItem({ item, index, separators }) {
    return (
      <TouchableHighlight
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        onPress={() => {}}>
        <View style={styles.plan}>
          <Text style={styles.plan_name}>{item.plan.name}</Text>
          <View>
            <View style={styles.plan_block}>
              <View style={styles.plan_progress}>
                <Progress.Bar
                  height={5}
                  progress={
                    item.completeList.length / item.plan.wordList.length || 0
                  }
                  color={color.primary_color}
                  borderWidth={1}
                  width={null}
                />
              </View>
              <Text style={styles.plan_text}>
                <Text style={{ color: color.primary_color }}>
                  {item.completeList.length}
                </Text>{' '}
                / {item.plan.wordList.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.planList}
        keyExtractor={item => item.plan._id}
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

export default MyPlan;
