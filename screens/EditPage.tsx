import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDictStore, usePitDict} from '../contexts/dict';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import React from 'react';

const EditPage = () => {
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    const pitDict = usePitDict(state => state.pitDict);
    const setPitDict = usePitDict(state => state.setPitDict);

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingBottom: RFValue(100),
                }}>
                
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingTop: RFValue(50),
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: 'white', // White text color for dark mode
        marginBottom: RFValue(20),
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        padding: RFValue(16),
        borderTopLeftRadius: RFValue(16),
        borderTopRightRadius: RFValue(16),
        // paddingBottom: RFValue(120),
    },
    centerContent: {
        borderRadius: RFValue(16),
        paddingTop: RFValue(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        padding: RFValue(16),
        width: '100%',
        alignSelf: 'center',
    },
    filesButton: {
        // backgroundColor: 'transparent',
        // borderColor: 'transparent',
        zIndex: 1,

        alignSelf: 'center',
        marginTop: RFValue(10),
        textAlign: 'center',
        padding: RFValue(16),
        borderRadius: RFValue(8),
        marginBottom: RFValue(10),
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#121212',
    },
    filesText: {
        textAlign: 'center',
        color: 'white',
    },
    valueBox: {
        width: '100%',
        backgroundColor: '#121212',
        padding: RFValue(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 16,
    },
    valueText: {
        color: 'white',
        textAlign: 'center',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: RFValue(-64),
        width: '100%',
        padding: RFValue(8),
        backgroundColor: '#121212',
    },
    swipeDeleteButton: {
        backgroundColor: '#e74c3c',
        padding: RFValue(14),
        borderRadius: RFValue(8),
        width: '50%',
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(-19),
        elevation: 5,
    },
    swipeSyncButton: {
        backgroundColor: 'lightblue',
        padding: RFValue(14),
        borderRadius: RFValue(8),
        width: '50%',
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(-19),
        elevation: 5,
    },
    swipeDeleteText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Arial',
    },
    iconStyle: {
        position: 'relative',
        color: 'white',
        alignSelf: 'center',
    },
    squareButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditPage;
