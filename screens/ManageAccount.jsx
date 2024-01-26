import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const ManageAccount = ({setLogin, setUser, user}) => {
    const logOut = () => {
        setLogin(false);
        setUser(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => logOut()}>
                    <View style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.welcomeText}>
                    Welcome {user.name} {'\n'}
                    Username: {user.username} {'\n'}
                    OSIS: {user.osis} {'\n'}
                </Text>

                <Text style={styles.infoText}>
                    Any issues with login or requested changes, please email{' '}
                    farhanj2@nycstudents.net
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34', // Change this to your desired background color
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    logoutButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 30,
        color: 'white',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
    },
});

export default ManageAccount;
