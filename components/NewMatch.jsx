import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Dropdown from './Dropdown';
import NumberInput from './NumberInput';

const NewMatch = () => {
  return (
    <View style={styles.NewMatchView}>
      <View>
        <Text style={styles.Text}>Competition:</Text>
        <Dropdown style={styles.Dropdown}/>

        <Text style={styles.Text}>Match Number:</Text>
        <NumberInput style={styles.TextInput} />
      </View>
    </View>
  );
};

export default NewMatch;

const styles = StyleSheet.create({
  NewMatchView: {
    backgroundColor: 'maroon',
    opacity: 0.3,
    alignItems: 'center',
    padding: 100,
  },
  Text: {
    fontSize: 40,
    fontFamily: 'sans-serif-condensed',
    color: 'white',
    textAlign: 'center'
  },
  TextInput: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight:   900
  },
  Dropdown: {

  }
});
