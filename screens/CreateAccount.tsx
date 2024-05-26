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
import {
    createAccount
} from '../authentication/api';

const CreateAccount = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [osis, setOsis] = useState('');
    const [name, setName] = useState('');

    const requestAccountCreation = async () => {
        const response = await createAccount(email, osis, name);
        console.log(response);
        if (response) {
            Alert.alert('Account Created', 'You can now log in with your email and OSIS number.');
            navigation.navigate('Login');
        } else {
            Alert.alert('Error', 'An error occurred while creating your account. Please try again.');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <AvoidKeyboardContainer>
                        <View style={styles.secondContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../assets/steelhawks.png')}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                        <Text style={styles.title}>Sign Up</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'white'}
                            placeholder="DOE Email"
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
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'white'}
                            placeholder="Your Full Name"
                            onChangeText={text => setName(text)}
                            value={name}
                            autoCapitalize="none"
                            keyboardType="default"
                        />
                        <Icon.Button
                            borderRadius={5}
                            name="log-in"
                            // disabled={email !== null}
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
                                Create Account
                            </Text>
                        </Icon.Button>
                    </AvoidKeyboardContainer>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
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
        paddingTop: RFValue(10),
        alignItems: 'center',
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 3,
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

export default CreateAccount;
