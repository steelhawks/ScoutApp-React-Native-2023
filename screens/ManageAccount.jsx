import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import Button from '../components/inputs/Button';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import {Platform} from 'react-native';

const STEEL_HAWKS_URL = 'https://www.steelhawks.org/'

const ManageAccount = ({setUser, user, appVersion, eventName, serverIp}) => {
    const [isLoading, setIsLoading] = useState(false);

    const logOut = async () => {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('osis');
        setUser(null);
        setIsLoading(false);
    };

    const openLinkInBrowserHandler = async () => {
        InAppBrowser.isAvailable().then(() => {
            if (Platform.OS === 'ios') {
                return InAppBrowser.open(STEEL_HAWKS_URL, {
                    animated: true,
                    modalEnabled: true,
                    showTitle: true,
                });
            } else if (Platform.OS === 'android') {
                return InAppBrowser.open(STEEL_HAWKS_URL, {
                    modalEnabled: true,
                    showTitle: true,
                });
            }
            
        });
    };

    return (
        <SafeAreaView style={styles.avoidTabBar}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Manage Account</Text>
                    <View style={styles.centerContent}>
                        <Button
                            label="Log Out"
                            onPress={() => {
                                setIsLoading(true);
                                logOut();
                            }}
                        />
                        <Text style={styles.welcomeText}>
                            Hello {user.name} {'\n'}
                            Username: {user.username} {'\n'}
                            OSIS: {user.osis} {'\n'}
                            Event: {eventName} {'\n'}
                            {/* Server: {serverIp === '101' ? 'Offline' : serverIp} {'\n'} */}
                            App Version: {appVersion}
                        </Text>
                    </View>

                    <Text style={styles.infoText}>
                        {/* Any issues with login or requested changes, please email{' '}
                        farhanj2@nycstudents.net {'\n'} */}
                        Scout 24 {appVersion} {'\n'}
                        Build: {DeviceInfo.getBuildNumber()}
                    </Text>

                    <AnimationLoader isLoading={isLoading} />
                </View>
            </ScrollView>
            <View
                style={{
                    borderWidth: 0,
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    bottom: RFValue(110), // Adjust this value as needed
                }}>
                <Icon.Button
                    paddingLeft={RFValue(10)}
                    name="globe"
                    size={RFValue(25)}
                    color="white"
                    alignSelf="center"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        zIndex: 1,
                    }}
                    onPress={() => {
                        openLinkInBrowserHandler();
                    }}
                />
            </View>

            <View
                style={{
                    borderWidth: 0,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    bottom: RFValue(110), // Adjust this value as needed
                }}>
                <Icon.Button
                    name="settings"
                    size={RFValue(25)}
                    color="white"
                    alignSelf="center"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        zIndex: 1,
                    }}
                    onPress={() => {
                        console.log('Settings button pressed');
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    avoidTabBar: {
        flex: 1,
        backgroundColor: '#121212',
        paddingBottom: RFValue(60),
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        paddingLeft: 50,
        paddingRight: 50,
        borderTopLeftRadius: RFValue(16),
        borderTopRightRadius: RFValue(16),
        top: 30,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1e1e', // Slightly lighter background for content
        borderRadius: RFValue(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // paddingTop: RFValue(12),
        // paddingBottom: RFValue(12),

        padding: RFValue(16),
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        position: 'absolute',
        paddingBottom: RFValue(450),
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: RFValue(20),
        color: 'white',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: RFValue(30),
        color: 'white',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: RFValue(65),
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
    },
});

export default ManageAccount;
