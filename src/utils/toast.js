import { ToastAndroid } from 'react-native';

const DEFAULT_DURATION = 200;
export default message => {
  ToastAndroid.show(message, DEFAULT_DURATION);
};
