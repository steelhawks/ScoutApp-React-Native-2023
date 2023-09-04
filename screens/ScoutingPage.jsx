import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewMatch from '../components/NewMatch';

const ScoutingPage = () => {
  return (
    <SafeAreaView style={styles.MainView}>
      <NewMatch />
    </SafeAreaView>
  );
};

export default ScoutingPage;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'black',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
});
