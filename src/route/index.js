import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import login from '../view/login/loginView';
import index from '../view/index/indexView';

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: login
    },
    index: {
      screen: index
    }
  },
  {
    initialRouteName: 'login'
  }
);

export default createAppContainer(AppNavigator);
