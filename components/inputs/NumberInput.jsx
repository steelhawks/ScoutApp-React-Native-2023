import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

const NumberInput = (props) => {
  const [numericVal, onChangeNumericVal] = useState(0);
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const checkInputForNumericValue = (text) => {
    let newVal = '';
    if (text.length !== 0) {
      for (let t of text) {
        if (digits.includes(t)) {
          newVal += t;
          onChangeNumericVal(newVal);
          props.onNumericValChange(newVal); // Call the callback function with the updated value
        }
      }
    } else {
      onChangeNumericVal('');
      props.onNumericValChange(''); // Call the callback function with an empty string
    }
  };

  return (
    <View>
      {props.title !== undefined ? (
        <Text style={props.title_style}>{props.title}</Text>
      ) : null}
      <TextInput
        onChangeText={checkInputForNumericValue}
        inputMode={'numeric'}
        keyboardType={'numeric'}
        value={numericVal.toString()} /* Ensure numericVal is a string for TextInput */
        maxLength={3}
        style={props.style}></TextInput>
    </View>
  );
};

export default NumberInput;