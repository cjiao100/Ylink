import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// import login from '../view/login/loginView';
import Home from '../view/index/home';
import Study from '../view/index/study';
import BottomBar from '../components/bottomBar/bottomBar';

// const BottomBar = createBottomTabNavigator(
//   {
//     home: home,
//     study: study
//   },
//   { tabBarComponent: props => bottomBar(props) }
// );

// const AppNavigator = createStackNavigator(
//   {
//     login: {
//       screen: login
//     },
//     home: {
//       screen: home
//     },
//     study: {
//       screen: study
//     }
//   },
//   {
//     initialRouteName: 'home'
//   }
// );

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
    }
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: props => <BottomBar {...props} />
  }
);

export default createAppContainer(TabNavigator);

// export default createAppContainer(AppNavigator);
