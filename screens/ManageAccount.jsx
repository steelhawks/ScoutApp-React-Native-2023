import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ManageAccount = (props) => {
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
