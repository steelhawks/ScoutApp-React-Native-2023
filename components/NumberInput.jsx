import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';

const NumberInput = props => {
  const [numericVal, onChangeNumericVal] = useState('');
  const digits = [0, 1, 2, 3, 4, 5, 7, 8, 9];

  const checkInputForNumericValue = text => {
    let newVal = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] in digits) {
        newVal += text[i];
        onChangeNumericVal(newVal);
      }
    }
  };

  return (
    <TextInput
      onChangeText={checkInputForNumericValue}
      inputMode={'numeric'}
      keyboardType={'numeric'}
      value={numericVal}
      maxLength={3}
      style={props.style}></TextInput>
  );
};

export default NumberInput;
