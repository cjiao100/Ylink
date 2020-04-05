import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planList: []
    };
  }

  render() {
    return (
      <View>
        <Text>Setting</Text>
      </View>
    );
  }
}

export default Setting;
