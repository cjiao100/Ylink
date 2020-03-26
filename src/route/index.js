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
import StarScreen from '../view/mine/star';
import WordbookScreen from '../view/mine/wordbook';

// translate
import ResultScreen from '../view/translate/result';

// study
import TestScreen from '../view/study/test';

// forum
import PostScreen from '../view/forum/post';
import { color } from '../assets/styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootStack(isLogin = false) {
  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'Login' : 'BottomTabs'}
      screenOptions={{
        headerStyle: {
          backgroundColor: color.primary_color,
          elevation: 0
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
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
      <Stack.Screen name="Star" component={StarScreen} />
      <Stack.Screen name="WordBook" component={WordbookScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
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

export default isLogin => RootStack(isLogin);
