import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

import { color, font } from '../../assets/styles/theme';

const BottomBar = ({ state, descriptors, navigation }) => {
  const { jumpTo } = navigation;
  const routesTitle = state.routes.map(router => ({
    title: descriptors[router.key].options.title,
    path: router.name,
    key: router.key
  }));

  const onPress = item => {
    const event = navigation.emit({
      type: 'tabPress',
      target: item.key,
      canPreventDefault: true
    });

    console.log(item);

    if (!event.defaultPrevented) {
      const temp = state.routes.filter(route => route.key === item.key)[0];
      console.log(temp);
      if (temp.params) {
        temp.params.queryData();
      }
      navigation.navigate(item.path);
    }
  };

  return (
    <BoxShadow setting={shadowOpt}>
      <View style={barStyle.container}>
        {routesTitle.map(item => (
          <View
            key={item.path}
            style={item.path === 'Translate' ? barStyle.search : ''}>
            <Text
              style={
                item.path === 'Translate'
                  ? barStyle.searchText
                  : barStyle.barText
              }
              onPress={() => onPress(item)}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </BoxShadow>
  );
};

// 获取屏幕宽度
const { width } = Dimensions.get('window');
const barStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    backgroundColor: color.white_color
  },
  search: {
    backgroundColor: color.primary_color,
    height: 60,
    width: 60,
    borderRadius: 50,
    // translateY: -10
    transform: [
      {
        translateY: -10
      }
    ]
  },
  searchText: {
    fontSize: font.big_size,
    color: color.white_color,
    lineHeight: 60,
    textAlign: 'center'
  },
  barText: {
    lineHeight: 40
  }
});
// 设置阴影
const shadowOpt = {
  width: width,
  height: 40,
  color: color.info_color,
  border: 3,
  opacity: 0.2
};

export default BottomBar;
