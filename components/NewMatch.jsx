import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';

const NewMatch = (props) => {
  return (
    <View style={styles.NewMatchView}>
      {props.logged_in ? (
        <View>
          <Input {...{type:"Number", title : "Match Number:", title_style : styles.Text, style : styles.TextInput}}/>
          <Input {...{type:"CheckboxGroup", opts: ["test", "test2", "test3", "test4"]}}/>
        </View>
      ) : (
        <Text style={[styles.Text, {margin: 0}]}>PLEASE LOG IN</Text>
      )}
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
    textAlign: 'center',
  },
  TextInput: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
    fontWeight: '900',
  },
  Dropdown: {},
});
