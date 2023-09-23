/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Text, View, StyleSheet, StatusBar } from "react-native";

import {CameraScreen} from './camera';


function App(): JSX.Element {
  return (<>
      <StatusBar hidden={true}/>
    <View style={styles.container}>
      <CameraScreen />
    </View>

  </>

  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // ваш цвет
  },
});
