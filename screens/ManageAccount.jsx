import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import user from "./Login"

const ManageAccount = ({user}) => {
  return (
    <View style={styles.container}>
      <Text>Manage Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManageAccount;
