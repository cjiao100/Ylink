import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import login from '../view/login/loginView';

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: login
    }
  },
  {
    initialRouteName: 'login'
  }
);

export default createAppContainer(AppNavigator);
