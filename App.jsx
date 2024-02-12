import {useEffect, useState} from 'react';
import Login from './screens/Login';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ManageAccount from './screens/ManageAccount';
import Tutorial from './screens/Tutorial';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import { NewMatch } from '.';

const Drawer = createDrawerNavigator();

const App = () => {
    const [user, setUser] = useState(null);
    const [serverIp, setServerIp] = useState();
    const [eventName, setEventName] = useState(null);
    const [matchCreated, setMatchCreated] = useState(false);
    const [appVersion] = useState('v0.5a')

    // NewMatch VARS
    const [matchNumber, setMatchNumber] = useState(0);
    const [teamNumber, setTeamNumber] = useState(0);
    const [driveStation, setDriveStation] = useState(0);

    const NewMatchNavigate = props => {
        return (
            <NewMatch
                {...props}
                user={user}
                eventName={eventName}
                setMatchCreated={setMatchCreated}
                setTeamNumber={setTeamNumber}
                setMatchNumber={setMatchNumber}
                setDriveStation={setDriveStation}
            />
        )
    }

    const ScoutingPageNavigate = props => {
        return (
            <ScoutingPage
                {...props}
                user={user}
                eventName={eventName}
                setMatchCreated={setMatchCreated}
                teamNumber={teamNumber}
                matchNumber={matchNumber}
                driveStation={driveStation}
            />
        );
    };

    const AccountManagementNavigate = props => {
        return (
            <ManageAccount
                {...props}
                setUser={setUser}
                user={user}
                appVersion={appVersion}
                eventName={eventName}
                serverIp={serverIp}
            />
        );
    };

    const LoginPageNavigate = props => {
        return (
            <Login
                {...props}
                user={user}
                setEventName={setEventName}
                setServerIp={setServerIp}
                setUser={setUser}
                appVersion={appVersion}
            />
        );
    };

    const HelpPageNavigate = props => {
        return <Tutorial />;
    };

    const DataPageNavigate = props => {
        return (
            <DataPage
                {...props}
                serverIp={serverIp}
            />
        );
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
            {user != null ? (
                <Drawer.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        activeBackgroundColor: 'white',
                        drawerLabelStyle: {color: 'white'},
                        activeTintColor: 'white',
                    }}>
                    {matchCreated ? (
                        <Drawer.Screen name="Scouting" component={ScoutingPageNavigate} />
                    ) : (
                        <Drawer.Screen
                        screenOptions={{
                            activeBackgroundColor: 'white',
                            drawerLabelStyle: {color: 'white'},
                            activeTintColor: 'white',
                        }}
                        name="New Match"
                        component={NewMatchNavigate}
                    />
                    )}
                    <Drawer.Screen name="Data" component={DataPageNavigate} />
                    <Drawer.Screen name="Help" component={HelpPageNavigate} />
                    <Drawer.Screen
                        name={user.name}
                        component={AccountManagementNavigate}
                    />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={LoginPageNavigate} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
