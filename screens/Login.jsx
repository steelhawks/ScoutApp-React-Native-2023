import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    Text,
    Alert,
    StyleSheet,
    Image,
    Keyboard,
} from 'react-native';
import {fetchUserCredentialsFromServer} from '../authentication/request_login';
import {fetchTeamDataFromServer} from '../authentication/request_team_data';
import {fetchEventNameFromServer} from '../authentication/request_event_name';
import AnimationLoader from '../AnimationLoader';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/inputs/Button';
import {RFValue} from 'react-native-responsive-fontsize';
import SafeAreaContainer from '../components/SafeAreaContainer';
import AvoidKeyboardContainer from '../components/AvoidKeyboardContainer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import LocalAuthentication from 'rn-local-authentication';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({
    user,
    setUser,
    setServerIp,
    setEventName,
    appVersion,
    setTeamData,
}) => {
    const [username, setUsername] = useState('');
    const [osis, setOsis] = useState('');
    const [Ip, setIp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [stayRemembered, setStayRemembered] = useState(false);

    useEffect(() => {
        const tryAutoLogin = async () => {
            try {
                const savedIp = await AsyncStorage.getItem('serverIp');
                const savedUsername = await AsyncStorage.getItem('username');
                const savedOsis = await AsyncStorage.getItem('osis');

                // if (savedIp && savedUsername && savedOsis) {
                //     // authenticate with the server using the saved credentials
                //     const userData = await fetchUserCredentialsFromServer(
                //         savedIp,
                //         savedUsername,
                //         savedOsis,
                //         appVersion,
                //     );

                //     if (userData && userData.length > 0) {
                //         const user = userData[0];
                //         setUser(user);
                //         setEventName(user.competition_name);
                //         setServerIp(savedIp);
                //         setTeamData(await fetchTeamDataFromServer(savedIp));
                //     }
                // }
            } catch (error) {
                console.error('Error during auto-login:', error);
            }
        };

        tryAutoLogin();
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);

        if (Ip === null) {
            Alert.alert('Please enter a server IP address');
            setIsLoading(false);
            return;
        }

        // save the IP address to AsyncStorage
        try {
            await AsyncStorage.setItem('serverIp', Ip);
        } catch (error) {
            console.error('Error saving IP address:', error);
        }

        if (stayRemembered) {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('osis', osis);
        }

        try {
            // login info request
            const userData = await fetchUserCredentialsFromServer(
                Ip,
                username,
                osis,
                appVersion,
            );

            const eventName = await fetchEventNameFromServer(Ip);
            setEventName(eventName.name);

            // team data request
            const allTeamData = await fetchTeamDataFromServer(Ip);
            setTeamData(allTeamData);

            if (userData && userData.length > 0) {
                const user = userData[0];
                setUser(user);
                setServerIp(Ip);
            } else {
                console.error('Incorrect username or password');
                Alert.alert('Incorrect username or password');
            }
        } catch (error) {
            Alert.alert('Error connecting to the server', error);
            console.error('Error connecting to the server', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isTablet = () => {
        return DeviceInfo.isTablet();
    };

    return (
        <SafeAreaView style={styles.container}>
            <>
                <View style={styles.background}>
                    {user != null ? (
                        <View>
                            <Text>Hello!</Text>
                        </View>
                    ) : (
                        <React.Fragment>
                            <AvoidKeyboardContainer>
                                <View style={styles.secondContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={require('../assets/steelhawks.png')}
                                            style={styles.image}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.title}>Hello</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'white'}
                                    placeholder="Username"
                                    onChangeText={text => setUsername(text)}
                                    value={username}
                                    autoCapitalize="none"
                                    keyboardType="username"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'white'}
                                    placeholder="OSIS"
                                    onChangeText={text => setOsis(text)}
                                    value={osis}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'white'}
                                    placeholder="Server IP"
                                    onChangeText={text => setIp(text)}
                                    value={Ip}
                                    keyboardType="numeric"
                                />

                                <Button
                                    label="Login"
                                    onPress={() => {
                                        setIsLoading(true);
                                        handleLogin();
                                    }}
                                />
                                {!isTablet() && (
                                    <View style={styles.tabletView}>
                                        <BouncyCheckbox
                                            size={20}
                                            paddingTop={10}
                                            alignSelf={'center'}
                                            alignItems={'center'}
                                            text={'Remember me'}
                                            textAlign={'center'}
                                            unfillColor="black"
                                            fillColor="rgba(136, 3, 21, 1)"
                                            onPress={stayRemembered => {
                                                setStayRemembered(
                                                    stayRemembered,
                                                );
                                            }}
                                            textStyle={{
                                                paddingRight: 10,
                                                color: 'white',
                                                textDecorationLine: 'none',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </View>
                                )}
                                <Text style={styles.footer}>
                                    App Version: {appVersion} Build:{' '}
                                    {DeviceInfo.getBuildNumber()}
                                </Text>
                            </AvoidKeyboardContainer>
                        </React.Fragment>
                    )}
                </View>
                <AnimationLoader isLoading={isLoading} />
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: RFValue(16),
        borderRadius: RFValue(16),
        paddingTop: RFValue(25),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        paddingTop: RFValue(10),
        paddingBottom: RFValue(15),
        width: '90%',
        alignSelf: 'center',
    },
    secondContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 10,
        marginBottom: 50,
        elevation: 3,
        paddingTop: 10,
        paddingBottom: -10,
        width: '90%',
        alignSelf: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: RFValue(25),
        fontWeight: 'bold',
        marginBottom: RFValue(20),
        color: 'white',
        textAlign: 'center',
    },
    input: {
        padding: RFValue(10),
        borderRadius: RFValue(5),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: RFValue(10),
        color: 'white',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: RFValue(15),
        borderRadius: RFValue(5),
        marginHorizontal: '10%',
    },
    buttonText: {
        color: 'black',
        fontSize: RFValue(20),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    footer: {
        top: 15,
        color: 'white',
        fontSize: RFValue(10),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default Login;
