import React from 'react';
import { createAppContainer } from 'react-navigation';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import route from './src/route/index';

const AppContainer = createAppContainer(route);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#E91B36" />
      <SafeAreaView style={styles.main}>
        <AppContainer />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

export default App;
