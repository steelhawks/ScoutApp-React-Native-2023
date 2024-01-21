import {useEffect, useState} from 'react';
import Login from './screens/Login';
import HomePage from './screens/HomePage';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ExtraInfoPage from './screens/ExtraInfoPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import Orientation from 'react-native-orientation-locker';

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

    const HomePageNavigate = props => {
        return <HomePage setLogin={setLogin} />;
    };
	
    const ScoutingPageNavigate = props => {
        return <ScoutingPage logged_in={logged_in} />;
    };

    return (
        <NavigationContainer initialRouteName="Login" backBehavior="firstRoute">
            {logged_in ? (
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen
                        name="Login"
                        component={props => (
                            <Login {...props} setLogin={setLogin} />
                        )}
                    />
                    {/* DEPRECATED LOGIN SCREEN */}
                    {/* <Drawer.Screen name="Home" component={HomePageNavigate} /> */}
                    <Drawer.Screen
                        name="Scouting"
                        component={ScoutingPageNavigate}
                    />
                    <Drawer.Screen name="Data" component={DataPage} />
                    <Drawer.Screen
                        name="Extra Info"
                        component={ExtraInfoPage}
                    />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator>
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
