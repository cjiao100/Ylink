import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import LoginView from './src/login/loginView';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#963830" />
      <SafeAreaView>
        <LoginView />
      </SafeAreaView>
    </>
  );
};

export default App;
