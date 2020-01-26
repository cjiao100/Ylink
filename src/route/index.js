import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import login from '../view/login/loginView';
import home from '../view/index/home';
import study from '../view/index/study';

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: login
    },
    home: {
      screen: home
    },
    study: {
      screen: study
    }
  },
  {
    initialRouteName: 'home'
  }
);

export default createAppContainer(AppNavigator);
