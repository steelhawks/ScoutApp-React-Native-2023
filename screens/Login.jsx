import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native';
import { returnUserCredentials } from '../authentication/auth';
import AnimationLoader from '../AnimationLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/inputs/Button';

const Login = ({ setLogin, setUser, logged_in, setServerIp, setCompetitionName}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Ip, setIp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // keep this for loading screen to work
        setTimeout(async () => {
            setIsLoading(true);
            setServerIp(Ip);
            try {
                // request from server and to make sure that it exists
                if (Ip === null) {
                    Alert.alert(
                        'Login Failed',
                        'Please enter a valid server IP address.'
                    );
                    setIsLoading(false);
                    return;
                }

                // check if the server is reachable and sync variables with the server
                try {
                    const response = await fetch(`http://${Ip}:8080/login`);
                    if (response.ok) {
                        const data = await response.json();
                        const competitionName = data.competition_name;
                        setCompetitionName(competitionName);
                        console.log('Competition Name from Server:', competitionName);
                    } else {
                        console.error('Server not reachable. Status: ' + response.status);
                        Alert.alert('Server not reachable. Status: ' + response.status);
                    }
                } catch (error) {
                    console.error('Error connecting to server:', error);
                    Alert.alert('Error connecting to server name: ' + error);
                    return;
                }
                

                const userCredentials = await returnUserCredentials();
                const user = userCredentials.find(
                    (userData) =>
                        userData.username === username &&
                        userData.password === password
                );
                setUser(user);

                if (user) {
                    setIsLoading(false);
                    setLogin(true);
                } else {
                    setIsLoading(false);
                    Alert.alert(
                        'Login Failed',
                        'Please enter a valid username and password.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                console.error('Error getting user credentials:', error);
            }

            setIsLoading(false);
        }, 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <>
                <View style={styles.background}>
                    {logged_in ? (
                        <View>
                            <Text>Hello!</Text>
                        </View>
                    ) : (
                        <React.Fragment>
                            <View style={styles.container}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={require('../assets/steelhawks.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </View>

                            <Text style={styles.title}>
                                Hello
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'white'}
                                placeholder="Username"
                                onChangeText={(text) => setUsername(text)}
                                value={username}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'white'}
                                placeholder="Password"
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'white'}
                                placeholder="Server IP"
                                onChangeText={(text) => setIp(text)}
                                value={Ip}
                            />

                            <Button label="Login" onPress={() => {
                                    setIsLoading(true);
                                    handleLogin();
                                }} />
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
        paddingBottom: 75,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        marginHorizontal: '10%',
        color: 'white',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: '10%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default Login;
