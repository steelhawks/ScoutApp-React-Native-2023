import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.MainView}>
      <View style={styles.TextView}>
        <Text style={styles.Text}>Welcome to ScoutApp!!!</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  TextView: {
    backgroundColor: 'maroon',
    opacity: 0.3,
    alignItems: 'center',
    padding: 100
  },
  Text: {
    fontSize: 120,
    fontFamily: 'sans-serif-condensed',
    color: 'white',
  },
  MainView: {
    backgroundColor: 'black',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
});
