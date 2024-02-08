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
import { fetchUserCredentialsFromServer } from '../authentication/api';
import AnimationLoader from '../AnimationLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/inputs/Button';

const Login = ({ setLogin, setUser, logged_in, setServerIp, setCompetitionName}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Ip, setIp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        if (Ip === null) {
            Alert.alert('Please enter a server IP address');
            setIsLoading(false);
            return;
        }
        
        try {
            const userCredentials = await fetchUserCredentialsFromServer(Ip, username, password);
            console.log(userCredentials);
            if (userCredentials.length > 0) {
                const user = userCredentials[0];
                setUser(user);
                if (user.username === username && user.password === password) {
                    const competitionName = user.competition_name;
                    setCompetitionName(competitionName);
                    console.log('Competition name from server', competitionName);
                    setLogin(true);
                } else {
                    console.error('Incorrect username or password');
                    Alert.alert('Incorrect username or password');
                }
            } else {
                console.error('User not found');
                Alert.alert('User not found');
            }
        } catch (error) {
            console.error('Error connecting to the server', error);
            Alert.alert('Error connecting to the server', error);
        } finally {
            setIsLoading(false);
        }
    }

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
