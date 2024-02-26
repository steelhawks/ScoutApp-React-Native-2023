import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import Button from '../components/inputs/Button';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageAccount = ({setUser, user, appVersion, eventName, serverIp}) => {
    const [isLoading, setIsLoading] = useState(false);

    const logOut = async () => {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('osis');
        setUser(null);
        setIsLoading(false);
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
                            Server: {serverIp === '101' ? 'Offline' : serverIp} {'\n'}
                            App Version: {appVersion}
                        </Text>
                    </View>

                    <Text style={styles.infoText}>
                        Any issues with login or requested changes, please email{' '}
                        farhanj2@nycstudents.net {'\n'}Scout 24 {appVersion}
                    </Text>
                    <AnimationLoader />
                </View>
            </ScrollView>
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
