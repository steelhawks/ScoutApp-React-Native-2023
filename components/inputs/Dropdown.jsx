import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Dropdown = (props) => {
  const openDropdown = () => {};

  return (
    <Pressable style={[props.style, styles.Dropdown]}>
      <Text style={styles.Text}>HELLO!</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Dropdown: {
    backgroundColor: "white"
  },
  Text: {
    color: "white",
    fontSize: 20
  }
});

export default Dropdown;
