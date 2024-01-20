import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewMatch from '../components/NewMatch';
import Input from '../components/Input';
import {useState} from 'react';

const ScoutingPage = props => {
  const [dict, setDict] = useState({
    "alliance": 0,
    "test": 1
  });

  const [newNumVal, setNewNumVal] = useState(0);

  const updateDict = (key, value) => {
    setDict({...dict, [key]: value});
  }

  const number = (newNumVal) => {
    setNewNumVal(newNumVal);
  }

  return (
    <SafeAreaView style={styles.MainView}>
      {/* <NewMatch logged_in={props.logged_in} /> */}
      <NumberInput
        title="Numeric Input"
        // style={styles.TextInput}
        onNumericValChange={number}
      />
        <TouchableOpacity onPress={() => updateDict("alliance", newNumVal)}>
          <Text style={{color: 'white', fontSize: 30}}>SAVE DATA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={console.log(dict)}>
          <Text style={{color: 'white', fontSize: 30}}>PRINT NUM</Text>
        </TouchableOpacity>

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
