import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const SafeAreaContainer = ({ children, style }) => (
  <SafeAreaView style={[styles.container, style]}>
    <StatusBar translucent backgroundColor="transparent" />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    paddingBottom: 75,
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(16),
    paddingTop: 0,
  },
});

export default SafeAreaContainer;
