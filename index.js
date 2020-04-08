/**
 * @format
 */

import { AppRegistry } from 'react-native';
import './src/global';

import App from './src/view/index';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
