import React from 'react';
import { Text } from 'react-native';
import { color } from '../assets/styles/theme';
import toast from './toast';

export default (element, topicList) => {
  console.log(topicList);
  let rightLabel = false;
  let str = [];
  let i = -1;

  for (let i = 0; i < element.length; i++) {
    if (element[i] === '#' && !rightLabel) {
      str[i] = '<*>#';
      rightLabel = true;
    } else if (element[i] === '#' && rightLabel) {
      str[i] = '#<*>';
      rightLabel = false;
    } else {
      str[i] = element[i];
    }
  }

  str = str
    .join('')
    .split('<*>')
    .map((item, index) => {
      if (item.includes('#')) {
        i++;
        return (
          <Text
            key={index}
            style={{ color: color.primary_color }}
            onPress={() => toast(`这个是一个话题${topicList[i]}`)}>
            {item}
          </Text>
        );
      }

      return item;
    });

  return str;
};
