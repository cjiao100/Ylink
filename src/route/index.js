import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import BottomBar from '../components/bottomBar/bottomBar';
import Login from '../view/login/loginView';
import Home from '../view/index/home';
import Study from '../view/index/study';
import Mine from '../view/index/mine';

// mine
import Star from '../view/mine/star';
import { color } from '../assets/styles/theme';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
        tabBarLabel: '首页'
      }
    },
    Study: {
      screen: Study,
      navigationOptions: {
        title: 'Study',
        tabBarLabel: '学习'
      }
    },
    Mine: {
      screen: Mine,
      navigationOptions: {
        title: 'Mine',
        tabBarLabel: '我的'
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: props => <BottomBar {...props} />
  }
);

const AppNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  login: {
    screen: Login,
    navigationOptions: {
      // header: null,
      title: '登录'
    }
  },
  star: {
    screen: Star,
    navigationOptions: {
      title: '收藏夹',
      headerStyle: {
        backgroundColor: color.primary_color,
        elevation: 0
      },
      headerTitleStyle: {
        color: color.white_color
      },
      headerTintColor: color.white_color
    }
  }
});

export default createAppContainer(AppNavigator);
