import {useEffect, useState} from 'react';
import Login from './screens/Login';
import HomePage from './screens/HomePage';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ManageAccount from './screens/ManageAccount';
import Tutorial from './screens/Tutorial';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo, {getApplicationName} from 'react-native-device-info';
// import loginCredentialsFile from './login.json';

const Drawer = createDrawerNavigator();

const App = () => {
    const [logged_in, setLogin] = useState(false);
    const [user, setUser] = useState(null);

    // this is to receive user data and use it in any file in this project
    // useEffect(() => {
    //     const storedUserData = loginCredentialsFile;
    //     if (storedUserData) {
    //       setUser(storedUserData);
    //       setLogin(true);
    //     }
    //   }, []);

    const ScoutingPageNavigate = props => {
        return (
            <ScoutingPage
                {...props}
                logged_in={logged_in}
                setLogin={setLogin}
                user={user}
            />
        );
    };

    const AccountManagementNavigate = props => {
        return (
            <ManageAccount
                {...props}
                setLogin={setLogin}
                setUser={setUser}
                logged_in={logged_in}
                user={user}
            />
        );
    };

    const LoginPageNavigate = props => {
        return (
            <Login
                {...props}
                setLogin={setLogin}
                setUser={setUser}
                logged_in={logged_in}
            />
        );
    };

    const HelpPageNavigate = props => {
        return (
            <Tutorial/>
        )
    }

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
                        drawerLabelStyle: {color: 'white'},
                        activeTintColor: 'white',
                    }}>
                    <Drawer.Screen
                        screenOptions={{
                            activeBackgroundColor: 'white',
                            drawerLabelStyle: {color: 'white'},
                            activeTintColor: 'white',
                        }}
                        name="Scouting"
                        component={ScoutingPageNavigate}
                    />
                    <Drawer.Screen name="Data" component={DataPage} />
                    <Drawer.Screen
                        name={"Help"}
                        component={HelpPageNavigate}
                    />
                    <Drawer.Screen
                        name={user.name}
                        component={AccountManagementNavigate}
                    />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        drawerLabelStyle: {color: 'white'},
                        activeTintColor: 'blue',
                    }}>
                    <Drawer.Screen name="Login" component={LoginPageNavigate} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
