/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-asy`nc-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {Platform} from 'react-native';
import SettingsPage from './SettingsPage';
import {useDictStore, usePitDict} from '../contexts/dict';

const STEEL_HAWKS_URL = 'https://www.steelhawks.org/';

// use for typescript migration 
// interface ManageAccountProps {
//     setUser: (user: any) => void;
//     user: any;
//     appVersion: string;
//     eventName: string;
// }

const ManageAccount = ({setUser, user, appVersion, eventName}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // const setDict = useDictStore(state => state.setDict);
    // const setPitDict = usePitDict(state => state.setDict);
    // const resetDict = useDictStore(state => state.resetDict);
    // const resetPitDict = usePitDict(state => state.resetDict);

    const logOut = async () => {
        // clean up before logout

        // remove all async storage
        // await AsyncStorage.removeItem('username');
        // await AsyncStorage.removeItem('osis');

        // broken??? why??
        // first clear the reactive variables
        // setDict('matchNumber', null);
        // setDict('driveStation', null);

        // then reset dict
        // resetDict();
        // resetPitDict();

        // then logout
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
                    // animated: false,
                    modalEnabled: true,
                    showTitle: true,
                });
            }
        });
    };

    return showSettings ? (
        <SettingsPage
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            appVersion={appVersion}
        />
    ) : (
        <SafeAreaView style={styles.avoidTabBar}>
            <View style={styles.container}>
                <Text style={styles.title}>Manage Account</Text>
                <View style={styles.centerContent}>
                    <Icon.Button
                        padding={RFValue(8)}
                        borderRadius={5}
                        name="log-out"
                        size={RFValue(25)}
                        color="white"
                        alignSelf="center"
                        backgroundColor="rgba(136, 3, 21, 1)"
                        underlayColor="transparent"
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            zIndex: 1,
                        }}
                        onPress={logOut}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                            }}>
                            Log Out
                        </Text>
                    </Icon.Button>
                    <Text style={styles.welcomeText}>
                        Hello {user.name} {'\n'}
                        Username: {user.username} {'\n'}
                        OSIS: {user.osis} {'\n'}
                        Event: {eventName} {'\n'}
                        App Version: {appVersion} {'\n'}
                    </Text>
                </View>
                <AnimationLoader isLoading={isLoading} />
            </View>
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
                    bottom: RFValue(110),
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
                        setShowSettings(!showSettings);
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
        paddingBottom: RFValue(525),
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
