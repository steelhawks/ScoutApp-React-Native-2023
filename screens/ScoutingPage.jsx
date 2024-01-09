import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewMatch from '../components/NewMatch';
import Input from '../components/Input';

const ScoutingPage = props => {
  return (
    <SafeAreaView style={styles.MainView}>
      <NewMatch logged_in={props.logged_in} />

      {/* <Input type={"text"} title={"Teleop"} titleStyle={styles.SmallText} style={styles.Dropdown} />
      <Input type={"text"} title={"Auton"} titleStyle={styles.SmallText} style={styles.Dropdown} /> */}
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
