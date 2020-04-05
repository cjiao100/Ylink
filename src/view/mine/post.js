import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: []
    };
  }

  render() {
    return (
      <View>
        <Text>MyPost</Text>
      </View>
    );
  }
}

export default MyPost;
