import React from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomBar from '../components/bottomBar/bottomBar';
import LoginScreen from '../view/login/loginView';

// tab
import HomeScreen from '../view/index/home';
import StudyScreen from '../view/index/study';
import TranslateScreen from '../view/index/translate';
import ForumScreen from '../view/index/forum';
import MineScreen from '../view/index/mine';

// mine
import Star from '../view/mine/star';
import Wordbook from '../view/mine/wordbook';

// translate
import Result from '../view/translate/result';

// study
import Test from '../view/study/test';

// forum
import Post from '../view/forum/post';
import { color } from '../assets/styles/theme';

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         title: 'Home',
//         tabBarLabel: '首页'
//       }
//     },
//     Study: {
//       screen: Study,
//       navigationOptions: {
//         title: 'Study',
//         tabBarLabel: '学习'
//       }
//     },
//     Translate: {
//       screen: Translate,
//       navigationOptions: {
//         title: 'Translate',
//         tabBarLabel: '查'
//       }
//     },
//     Forum: {
//       screen: Forum,
//       navigationOptions: {
//         title: 'Forum',
//         tabBarLabel: '论坛'
//       }
//     },
//     Mine: {
//       screen: Mine,
//       navigationOptions: {
//         title: 'Mine',
//         tabBarLabel: '我的'
//       }
//     }
//   },
//   {
//     initialRouteName: 'Home',
//     tabBarComponent: props => <BottomBar {...props} />
//   }
// );

// const AppNavigator = createStackNavigator(
//   {
//     TabNavigator: {
//       screen: TabNavigator,
//       navigationOptions: {
//         header: null
//       }
//     },
//     login: {
//       screen: Login,
//       navigationOptions: {
//         header: null,
//         title: '登录'
//       }
//     },
//     star: {
//       screen: Star,
//       navigationOptions: {
//         title: '收藏夹'
//       }
//     },
//     wordbook: {
//       screen: Wordbook,
//       navigationOptions: {
//         title: '单词本'
//       }
//     },
//     result: {
//       screen: Result,return
//       navigationOptions: {
//         title: ''
//       }
//     },
//     test: {
//       screen: Test,
//       navigationOptions: {
//         title: '测试页面'
//       }
//     },
//     post: {
//       screen: Post,
//       navigationOptions: {
//         title: ''
//       }
//     }
//   },
//   {
//     initialRouteName: 'login'
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: color.primary_color,
//         elevation: 0
//       },
//       headerTitleStyle: {
//         color: color.white_color
//       },
//       headerTintColor: color.white_color
//     }
//   }return
// );

// export default createAppContainer(AppNavigator);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen
        options={{ title: '首页' }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ title: '学习' }}
        name="Study"
        component={StudyScreen}
      />
      <Tab.Screen
        options={{ title: '查' }}
        name="Translate"
        component={TranslateScreen}
      />
      <Tab.Screen
        options={{ title: '论坛' }}
        name="Forum"
        component={ForumScreen}
      />
      <Tab.Screen
        options={{ title: '我的' }}
        name="Mine"
        component={MineScreen}
      />
    </Tab.Navigator>
  );
}

module.exports = RootStack;
