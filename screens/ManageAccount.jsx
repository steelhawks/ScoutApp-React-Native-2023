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
        backgroundColor: '#282c34', // Change this to your desired background color
    },
    centerContent: {
        paddingTop: RFValue(125), // Use responsive font size for padding
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        paddingBottom: RFValue(400), // Use responsive font size for padding
        fontSize: RFValue(36), // Use responsive font size for text
        fontWeight: 'bold',
        marginBottom: RFValue(20), // Use responsive font size for margin
        color: 'white',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: RFValue(24), // Use responsive font size for text
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: RFValue(30), // Use responsive font size for margin
        color: 'white',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: RFValue(20), // Use responsive font size for bottom position
    },
});

export default ManageAccount;
