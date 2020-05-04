import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { color } from '../../assets/styles/theme';
import toast from '../../utils/toast';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      goSearch: false
    };

    this.search = this.search.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  cancelSearch() {
    this.props.navigation.goBack();
  }

  search() {
    if (this.state.search) {
      this.setState({
        goSearch: true
      });
    } else {
      toast('还没输入搜索内容呢');
    }
  }

  onChangeText(text) {
    this.setState({
      search: text
    });
  }

  render() {
    return (
      <View>
        <View style={styles.search}>
          <TextInput
            style={styles.search_input}
            placeholder="搜点什么?"
            onChangeText={this.onChangeText}
            onSubmitEditing={this.search}
          />
          <Text style={styles.search_text} onPress={this.cancelSearch}>
            取消
          </Text>
        </View>
        {this.state.goSearch ? <Text>内容</Text> : <></>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: color.primary_color,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  search_input: {
    flex: 1,
    backgroundColor: color.white_color,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  search_text: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 5,
    color: color.white_color
  }
});

export default Search;
