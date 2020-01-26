import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import BottomBar from '../components/bottomBar/bottomBar';
import route from '../route/index';

const AppContainer = createAppContainer(route);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#E91B36" />
      <SafeAreaView style={styles.main}>
        <AppContainer />
        <BottomBar />
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

// export default index;
