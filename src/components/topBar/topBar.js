import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { color } from '../../assets/styles/theme';

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
      <View style={{ backgroundColor: color.primary_color }}>
        <View style={barStyle.bar_container}>
          <View style={barStyle.bar_icon}>
            <Text style={barStyle.bar_iconText}>Ylink</Text>
          </View>
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
  bar_icon: {
    flex: 1,
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
