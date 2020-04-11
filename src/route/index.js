import React from 'react';
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
import MyPostScreen from '../view/mine/post';
import MyPlanScreen from '../view/mine/plan';
import SettingScreen from '../view/mine/setting';

// translate
import ResultScreen from '../view/translate/result';

// study
import TestScreen from '../view/study/test';
import PlanListScreen from '../view/study/planlist';

// forum
import PostScreen from '../view/forum/post';
import CreatePostScreen from '../view/forum/createPost';

// home
import ArticleScreen from '../view/home/article';
import { color } from '../assets/styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootStack(isLogin = false) {
  console.log(isLogin);
  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'BottomTabs' : 'Login'}
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
      <Stack.Screen
        options={{ title: '收藏' }}
        name="Star"
        component={StarScreen}
      />
      <Stack.Screen
        options={{ title: '单词本' }}
        name="WordBook"
        component={WordbookScreen}
      />
      <Stack.Screen
        options={{ title: '我的帖子' }}
        name="MyPost"
        component={MyPostScreen}
      />
      <Stack.Screen
        options={{ title: '我的计划' }}
        name="MyPlan"
        component={MyPlanScreen}
      />
      <Stack.Screen
        options={{ title: '设置' }}
        name="Setting"
        component={SettingScreen}
      />
      <Stack.Screen
        options={{ title: '' }}
        name="Result"
        component={ResultScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: color.bg_info_color,
            elevation: 0
          },
          headerTintColor: color.primary_color
        }}
        name="Test"
        component={TestScreen}
      />
      <Stack.Screen
        options={{ title: '选择计划' }}
        name="PlanList"
        component={PlanListScreen}
      />
      <Stack.Screen
        options={{ title: '帖子' }}
        name="Post"
        component={PostScreen}
      />
      <Stack.Screen
        options={{ title: '发布帖子' }}
        name="CreatePost"
        component={CreatePostScreen}
      />
      <Stack.Screen
        options={{ title: '发布帖子' }}
        name="Article"
        component={ArticleScreen}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen
        options={{
          title: '首页',
          tabBarIcon: ({ size }) => <Icon name="home" size={size} />
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: '学习',
          tabBarIcon: ({ size }) => <Icon name="book" size={size} />
        }}
        name="Study"
        component={StudyScreen}
      />
      <Tab.Screen
        options={{
          title: '查',
          tabBarIcon: () => <Icon name="yelp" size={50} />
        }}
        name="Translate"
        component={TranslateScreen}
      />
      <Tab.Screen
        options={{
          title: '论坛',
          tabBarIcon: ({ size }) => <Icon name="forum" size={size} />
        }}
        name="Forum"
        component={ForumScreen}
      />
      <Tab.Screen
        options={{
          title: '我的',
          tabBarIcon: ({ size }) => <Icon name="account" size={size} />
        }}
        name="Mine"
        component={MineScreen}
      />
    </Tab.Navigator>
  );
}

export default isLogin => RootStack(isLogin);
