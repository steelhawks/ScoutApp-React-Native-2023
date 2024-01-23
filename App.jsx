import {useEffect, useState} from 'react';
import Login from './screens/Login';
import HomePage from './screens/HomePage';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ExtraInfoPage from './screens/ExtraInfoPage';
import ManageAccount from './screens/ManageAccount';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo, { getApplicationName } from 'react-native-device-info'

const Drawer = createDrawerNavigator();

const App = () => {
    const [logged_in, setLogin] = useState(false);

    // Let the app only work when device is in landscape
    useEffect(() => {
        Orientation.lockToLandscape();

        // Unlock orientation on unmount
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    useEffect(() => {
        if (!DeviceInfo.isTablet()) {
            Alert.alert('Please use a tablet device to use this app.', '', [
                {text: 'OK', onPress: () => BackHandler.exitApp()},
            ]);
        }


        return () => {
            if (!DeviceInfo.isTablet()) {
                // unlock orientatation on component unmount
                Orientation.unlockAllOrientations();
            }
        }
    })

    const HomePageNavigate = props => {
        return <HomePage setLogin={setLogin} />;
    };
	
    const ScoutingPageNavigate = props => {
        return <ScoutingPage logged_in={logged_in} />;
    };

    return (
        <NavigationContainer
            initialRouteName="Login"
            backBehavior="firstRoute"
            // theme={{colors: {background: 'lightblue'}}}>
            theme={{
                    dark: true,
                    colors: {
                        primary: '#222',
                        background: '#222',
                        card: '#222',
                        text: 'white',
                        border: '#222',
                        notification: '#222',
                        select: 'blue',
                    },
                }}>
            {logged_in ? (
                <Drawer.Navigator 
                    initialRouteName="Login"
                    screenOptions={{
                        activeBackgroundColor: 'white',
                        drawerLabelStyle: { color: 'white' },
                        activeTintColor: 'white',
                    }}>
                    
                    {/* Remove login screen after successful authentication */}
                    {/* <Drawer.Screen
                        name="Login"
                        component={props => (
                            <Login {...props} setLogin={setLogin} />
                        )}
                    /> */}
                    {/* DEPRECATED LOGIN SCREEN */}
                    {/* <Drawer.Screen name="Home" component={HomePageNavigate} /> */}
                    <Drawer.Screen
                        screenOptions={{
                            activeBackgroundColor: 'white',
                            drawerLabelStyle: { color: 'white' },   
                            activeTintColor: 'white',
                        }}
                        name="Scouting"
                        component={ScoutingPageNavigate}
                    />
                    <Drawer.Screen name="Data" component={DataPage} />
                    <Drawer.Screen
                        name="Extra Info"
                        component={ExtraInfoPage}
                    />
                    <Drawer.Screen
                        name={'Manage Account'}
                        component={ManageAccount}
                    />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator 
                    initialRouteName="Home"
                    screenOptions={{
                        drawerLabelStyle: { color: 'white' },
                        activeTintColor: 'blue',
                }}>
                    <Drawer.Screen
                        name="Login"
                        component={props => (
                            <Login {...props} setLogin={setLogin} />
                        )}
                    />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;