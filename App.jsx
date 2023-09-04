import React from 'react';
import HomePage from './screens/HomePage';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ExtraInfoPage from './screens/ExtraInfoPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer
      initialRouteName="Home"
      backBehavior="firstRoute">
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Scouting" component={ScoutingPage} />
        <Drawer.Screen name="Data" component={DataPage} />
        <Drawer.Screen name="Extra Info" component={ExtraInfoPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
