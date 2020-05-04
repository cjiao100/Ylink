import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { color } from '../../assets/styles/theme';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.openSearchView = this.openSearchView.bind(this);
  }

  openSearchView() {
    this.props.navigation.navigate('Search');
  }

  render() {
    return (
      <View style={{ backgroundColor: color.primary_color }}>
        <View style={barStyle.bar_container}>
          <View style={barStyle.bar_icon}>
            <Text style={barStyle.bar_iconText}>Ylink</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.openSearchView}>
            <View style={barStyle.bar_icon}>
              <Icon name="search1" style={barStyle.bar_iconText} size={20} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const barStyle = StyleSheet.create({
  bar_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
    paddingBottom: 10
  },
  bar_icon: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  bar_iconText: {
    color: color.white_color,
    lineHeight: 30
  }
});

export default TopBar;
