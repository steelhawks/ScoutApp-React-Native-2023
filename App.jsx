import {useEffect, useState} from 'react';
import Login from './screens/Login';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ManageAccount from './screens/ManageAccount';
import Tutorial from './screens/Tutorial';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import {NewMatch} from '.';
import PitScoutingPage from './screens/PitScoutingPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {checkLocalNetworkAccess, requestLocalNetworkAccess} from 'react-native-local-network-permission';
import { RequestDefaultPermissions, RequestNotifications } from './permissions/RequestPermissions';

// await checkLocalNetworkAccess();
// requestLocalNetworkAccess();

const Tab = createBottomTabNavigator(); // new

const App = () => {
    const [user, setUser] = useState(null);
    const [serverIp, setServerIp] = useState('');
    const [eventName, setEventName] = useState(null);
    const [matchCreated, setMatchCreated] = useState(false);
    const [appVersion] = useState('v0.9a');

    const [teamData, setTeamData] = useState(null);

    // NewMatch VARS
    const [teamNumber, setTeamNumber] = useState(0);
    const [matchNumber, setMatchNumber] = useState(0);
    const [matchType, setMatchType] = useState('EMPTY'); // COMP, QUAL, Default: EMPTY
    const [driveStation, setDriveStation] = useState(0);
    const [scoutingType, setScoutingType] = useState('Match Scouting'); // either pit scout or match scout

    const NewMatchNavigate = props => {
        // request notification access
        RequestNotifications();
        return (
            <NewMatch
                {...props}
                teamData={teamData}
                setMatchCreated={setMatchCreated}
                setTeamNumber={setTeamNumber}
                setMatchNumber={setMatchNumber}
                setMatchType={setMatchType}
                setDriveStation={setDriveStation}
                setScoutingType={setScoutingType}
                scoutingType={scoutingType}
            />
        );
    };

    const ScoutingPageNavigate = props => {
        return (
            <ScoutingPage
                {...props}
                user={user}
                eventName={eventName}
                setMatchCreated={setMatchCreated}
                teamNumber={teamNumber}
                matchNumber={matchNumber}
                matchType={matchType}
                driveStation={driveStation}
            />
        );
    };

    const PitScoutingPageNavigate = props => {
        return (
            <PitScoutingPage
                {...props}
                serverIp={serverIp}
                user={user}
                eventName={eventName}
                setMatchCreated={setMatchCreated}
                teamNumber={teamNumber}
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
        // request permissions
        RequestDefaultPermissions();
        return (
            <Login
                {...props}
                user={user}
                setEventName={setEventName}
                setServerIp={setServerIp}
                setTeamData={setTeamData}
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
                setUser={setUser}
                setServerIp={setServerIp}
            />
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer
                initialRouteName="Login"
                backBehavior="firstRoute"
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
                    <Tab.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            tabBarHideOnKeyboard: true,
                            headerShown: false,
                            activeBackgroundColor: 'white',
                            tabBarActiveBackgroundColor: 'white',
                            activeTintColor: 'white',
                            tabBarStyle: {
                                position: 'absolute',
                                bottom: RFValue(25),
                                left: RFValue(20),
                                right: RFValue(20),
                                elevation: 0,
                                backgroundColor: 'transparent',
                                borderRadius: RFValue(20),
                                height: RFValue(70),
                                overflow: 'hidden',

                                // need to remove safeareaview on iPhone X and newer devices
                                paddingBottom: 0,
                            },
                            tabBarLabelStyle: {
                                paddingBottom: RFValue(10),
                            },

                            tabBarBackground: () => (
                                <BlurView
                                    intensity={80}
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        borderTopLeftRadius: RFValue(20),
                                        borderTopRightRadius: RFValue(20),
                                        overflow: 'hidden',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            ),
                        }}>
                        {matchCreated ? (
                            scoutingType === 'Match Scouting' ? (
                                <Tab.Screen
                                    name="Scouting"
                                    component={ScoutingPageNavigate}
                                    options={{
                                        tabBarIcon: ({color, size}) => (
                                            <Icon
                                                type="Feather"
                                                name="play"
                                                color={color}
                                                size={size}
                                            />
                                        ),
                                    }}
                                />
                            ) : (
                                <Tab.Screen
                                    name="Pit Scouting"
                                    component={PitScoutingPageNavigate}
                                    options={{
                                        tabBarIcon: ({color, size}) => (
                                            <Icon
                                                type="Feather"
                                                name="play"
                                                color={color}
                                                size={size}
                                            />
                                        ),
                                    }}
                                />
                            )
                        ) : (
                            <>
                                <Tab.Screen
                                    screenOptions={
                                        {
                                            // activeBackgroundColor: 'white',
                                            // drawerLabelStyle: {color: 'white'},
                                            // activeTintColor: 'white',
                                        }
                                    }
                                    name="New Match"
                                    component={NewMatchNavigate}
                                    options={{
                                        tabBarIcon: ({color, size}) => (
                                            <Icon
                                                type="Feather"
                                                name="trello"
                                                color={color}
                                                size={size}
                                            />
                                        ),
                                    }}
                                />
                            </>
                        )}
                        <Tab.Screen
                            name="Data"
                            component={DataPageNavigate}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <Icon
                                        type="Feather"
                                        name="upload-cloud"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                        {/* <Tab.Screen
                            name="Help"
                            component={HelpPageNavigate}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <Icon
                                        type="Feather"
                                        name="help-circle" // random value so question mark is used
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        /> */}
                        <Tab.Screen
                            name={user.name}
                            component={AccountManagementNavigate}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <Icon
                                        type="Feather"
                                        name="users"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Login"
                            component={LoginPageNavigate}
                        />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default App;
