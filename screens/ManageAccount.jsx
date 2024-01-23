import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import user from "./Login"

const ManageAccount = ({setLogin, setUser, logged_in, user}) => {
    const logOut = () => {
        setLogin(false);
        setUser(null);
    };
    //style={styles.container}>
    return (
        <View>
            <ScrollView>
                <TouchableOpacity onPress={() => logOut()}>
                    <View
                        style={{
                            backgroundColor: 'lightblue',
                            padding: 15,
                            borderRadius: 5,
                            marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 20,
                            width: '10%',
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                            }}>
                            Log Out
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        alignSelf: 'left',
                        marginBottom: 50,
                        marginLeft: 20,
                        color: 'white',
                    }}>
                    Welcome {user.name}
                    {'\n'}
                    Username: {user.username}
                    {'\n'}
                    OSIS: {user.osis}
                    {'\n'}
                </Text>

                <Text
                    style={{
                        alignSelf: 'middle',
                        color: 'white',
                    }}>
                    Any issues with login or requested changes, please email
                    farhanj2@nycstudents.net
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManageAccount;
