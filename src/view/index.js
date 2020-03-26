import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Navigation from '../route';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#E91B36" />
      <SafeAreaView style={styles.main}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
