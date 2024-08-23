import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text,
    Alert,
    StyleSheet,
    Image,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import AvoidKeyboardContainer from '../components/AvoidKeyboardContainer';
import * as LocalAuthentication from 'expo-local-authentication';
import DeviceInfo from 'react-native-device-info';
import fs from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAccount} from '../authentication/api';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {Button} from 'react-native-paper';

const CreateAccount = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [osis, setOsis] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const requestAccountCreation = async () => {
        const response = await createAccount(email, osis, name);
        console.log(response);
        if (response) {
            Alert.alert(
                'Account Created',
                'You can now log in with your email and OSIS number.',
            );
            navigation.navigate('Login');
        } else {
            Alert.alert(
                'Error',
                'An error occurred while creating your account. Please try again.',
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/background.png')}
                        style={styles.image}
                    />

                    <View style={styles.imageLayer}>
                        <Animated.Image
                            entering={FadeInUp.delay(200)
                                .duration(1000)
                                .springify()}
                            style={styles.icons}
                            source={require('../assets/hawk.png')}
                        />
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inner}>
                            <Animated.Text
                                entering={FadeInUp.delay(400)
                                    .duration(1000)
                                    .springify()}
                                style={styles.title}>
                                New User
                            </Animated.Text>
                        </View>
                    </View>

                    <Text style={[styles.title, {marginTop: RFValue(50)}]}>
                        Welcome
                    </Text>

                    <Animated.View
                        style={styles.login}
                        entering={FadeInDown.delay(600)
                            .duration(1000)
                            .springify()}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'white'}
                            placeholder="Name"
                            onChangeText={text => setName(text)}
                            value={name}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'white'}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'white'}
                            placeholder="OSIS"
                            onChangeText={text => setOsis(text)}
                            value={osis}
                            keyboardType="numeric"
                        />
                        <Icon.Button
                            borderRadius={5}
                            name="log-in"
                            size={RFValue(25)}
                            color="white"
                            backgroundColor="rgba(136, 3, 21, 1)"
                            underlayColor="transparent"
                            style={styles.iconButton}
                            onPress={requestAccountCreation}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: 'white',
                                }}>
                                Create
                            </Text>
                        </Icon.Button>
                    </Animated.View>

                    <Animated.View
                        style={styles.switchView}
                        entering={FadeInDown.delay(800)
                            .duration(1000)
                            .springify()}>
                        <Text style={{color: 'white'}}>
                            Already have an account?
                        </Text>
                        <Button
                            style={{paddingBottom: RFValue(1)}}
                            onPress={() => {
                                navigation.navigate('Login');
                            }}>
                            Log In
                        </Button>
                    </Animated.View>

                    {/* <Animated.Text style={styles.footer} entering={FadeInDown.delay(800).duration(1000).springify()}>
                Developed by Steel Hawks {'\n'}
                Version: {appVersion}
            </Animated.Text> */}
                </View>

                <AnimationLoader
                    isLoading={isLoading}
                    onAnimationComplete={undefined}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    switchView: {
        padding: 0,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%', // Adjust the width as needed
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    icons: {
        resizeMode: 'contain',
        height: 100,
        width: 200,
        marginTop: RFValue(80),
        marginBottom: 50,
    },
    imageLayer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
    },
    title: {
        fontSize: RFValue(40),
        marginTop: RFValue(150),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    iconButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        zIndex: 1,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        backgroundColor: '#222',
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        paddingVertical: RFValue(12),
        paddingHorizontal: RFValue(15),
        height: RFValue(40),
        borderRadius: RFValue(8),
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        marginBottom: RFValue(10),
        backgroundColor: 'rgba(24, 24, 25, 0.5)',
        color: '#F9FAFB',
        width: '80%',
        fontSize: RFValue(16),
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
        // top: 15,
        color: 'white',
        fontSize: RFValue(10),
        alignSelf: 'center',
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign: 'center',
    },
});

export default CreateAccount;
