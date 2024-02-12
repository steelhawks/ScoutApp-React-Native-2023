import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimationLoader from '../AnimationLoader';
import Button from '../components/inputs/Button';
import { RFValue } from 'react-native-responsive-fontsize';

const ManageAccount = ({ setUser, user, appVersion, eventName, serverIp }) => {
    const [isLoading, setIsLoading] = useState(false);

    const logOut = () => {
        setUser(null);
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Account</Text>
            <View style={styles.centerContent}>
                <Button label="Log Out" onPress={() => { setIsLoading(true); logOut(); }} />
                <Text style={styles.welcomeText}>
                    Hello {user.name} {'\n'}
                    Username: {user.username} {'\n'}
                    OSIS: {user.osis} {'\n'}
                    Event: {eventName} {'\n'}
                    Server: {serverIp} {'\n'}
                    Uptime: {} {'\n'}
                    App Version: {appVersion}
                </Text>
            </View>

            <Text style={styles.infoText}>
                Any issues with login or requested changes, please email{' '}
                farhanj2@nycstudents.net {'\n'}Scout 24 {appVersion}
            </Text>
            <AnimationLoader />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        padding: RFValue(16),
        borderRadius: RFValue(16),
    },
    centerContent: {
        paddingTop: RFValue(25),
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
        elevation: 3,
        paddingTop: RFValue(10),
        paddingBottom: RFValue(-10),
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        position: 'absolute',
        paddingBottom: RFValue(400),
        fontSize: RFValue(36),
        fontWeight: 'bold',
        marginBottom: RFValue(20),
        color: 'white',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: RFValue(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: RFValue(30),
        color: 'white',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: RFValue(30),
    },
});

export default ManageAccount;
