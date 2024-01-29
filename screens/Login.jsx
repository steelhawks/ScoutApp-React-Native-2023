import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { returnUserCredentials } from '../authentication/auth';
import AnimationLoader from '../AnimationLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ setLogin, setUser, logged_in }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        // testing for loading screen
        setTimeout(async () => {
            try {
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
                            <Text style={styles.title}>
                                Welcome to Scout App 2024
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

                            <TouchableOpacity
                                onPress={() => {
                                    setIsLoading(true);
                                    handleLogin();
                                }}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        LOGIN
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                </View>
                <AnimationLoader isLoading={isLoading} />
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
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
