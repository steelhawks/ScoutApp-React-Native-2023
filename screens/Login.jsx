import React, {useState} from 'react';
import {
    View,
    TextInput,
    Text,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity,
    // Animated,
} from 'react-native';
import {returnUserCredentials} from '../authentication/auth';

const Login = ({setLogin, setUser, logged_in}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredentials = await returnUserCredentials();
            const user = userCredentials.find(
                userData =>
                    userData.username === username &&
                    userData.password === password,
            );
            setUser(user);

            // keep commented during development
            // if (username === '' || password === '') {
            //     Alert.alert('Login Failed', 'Please enter username and password.');
            //     return;
            // }

            if (user) {
                setLogin(true);
                // Alert.alert('Welcome ' + user.name + '!', 'OSIS: ' + user.osis);
            } else {
                Alert.alert(
                    'Login Failed',
                    'Please enter a valid username and password.',
                );
            }
        } catch (error) {
            console.error('Error getting user credentials:', error);
        }
    };

    return (
        <View style={styles.background}>
            {logged_in ? (
                <View>
                    <Text>Hello!</Text>
                </View>
            ) : (
                <React.Fragment>
                    <Text
                        style={{
                            fontSize: 50,
                            fontWeight: 'bold',
                            marginBottom: 50,
                            marginLeft: 20,
                            color: 'white',
                        }}>
                        Welcome to Scout App 2024
                    </Text>

                    <TextInput
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10,
                            marginLeft: 60,
                            width: '40%',
                            color: 'white',
                        }}
                        placeholderTextColor={'white'}
                        placeholder="Username"
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                    <TextInput
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10,
                            marginLeft: 60,
                            width: '40%', // Set the width as needed
                            color: 'white',
                        }}
                        placeholderTextColor={'white'}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={handleLogin}>
                        <View
                            style={{
                                backgroundColor: 'lightblue',
                                padding: 15,
                                borderRadius: 5,
                                marginBottom: 20,
                                marginLeft: 250,
                                width: '10%', // Set the width as needed
                            }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 20,
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                }}>
                                LOGIN
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../assets/steelhawks.png')}
                                style={styles.image}
                            />
                        </View>
                    </View>
                </React.Fragment>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        backgroundColor: 'black',
    },
    container: {
        position: 'absolute',
        top: 200,
        right: 200,
        backgroundColor: 'black',
    },
    imageContainer: {
        alignItems: 'flex-end', // Align to the right
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

export default Login;
