import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { color } from '../../assets/styles/theme';

class Translate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={translateStyle.container}>
        <View style={translateStyle.title}>
          <Text style={translateStyle.title_text}>英领</Text>
        </View>
        <View style={translateStyle.input}>
          <TextInput style={translateStyle.input_content} />
        </View>
      </View>
    );
  }
}

const translateStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 1,
    justifyContent: 'center'
  },
  title_text: {
    textAlign: 'center',
    fontSize: 50
  },
  input: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20
  },
  input_content: {
    height: 40,
    borderColor: color.primary_color,
    borderRadius: 50,
    borderWidth: 1.5,
    padding: 10
  }
});

export default Translate;
