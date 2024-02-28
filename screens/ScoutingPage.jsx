import {StyleSheet, View, Alert} from 'react-native';
import React, {useState, useEffect, useCallback, createContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import fs from 'react-native-fs';
import {useBackHandler} from '@react-native-community/hooks';
import {RFValue} from 'react-native-responsive-fontsize';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Prematch from './Scouting/Prematch';
import Auton from './Scouting/Auton';
import Teleop from './Scouting/Teleop';
import Endgame from './Scouting/Endgame';
import {useDictStore} from '../contexts/dict';

const ScoutingPage = ({
    user,
    navigation,
    eventName,
    setMatchCreated,
    teamNumber,
    matchNumber,
    matchType,
    driveStation,
}) => {
    const Tab = createMaterialTopTabNavigator();

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [readyToPlaySuccessAnimation, setReadyToPlaySuccessAnimation] =
        useState(false);
    const [currentDate, setCurrentDate] = useState('');

    // zustand hooks
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        setCurrentDate(
            date +
                '/' +
                month +
                '/' +
                year +
                ' ' +
                hours +
                ':' +
                min +
                ':' +
                sec,
        );
    }, []);

    const endMatch = () => {
        setReadyToPlaySuccessAnimation(true);
        setIsLoading(true);
        setIsDone(true);

        setDict('eventName', eventName);
        setDict('scouterName', user.name);
        setDict('teamNumber', teamNumber);
        setDict('matchNumber', matchNumber);
        setDict('matchType', matchType); // qualification, practice, or elimination
        setDict('driveStation', driveStation);
        setDict('alliance', driveStation < 4 ? 'RED' : 'BLUE'); // red or blue
        setDict('timeOfCreation', currentDate);
    };

    useEffect(() => {
        if (isDone) {
            saveToJson(dict);
            setIsLoading(false);
            setIsDone(false);
        }
    }, [isDone, dict]);

    const saveToJson = async data => {
        try {
            const docDir = fs.DocumentDirectoryPath;
            const filePath = `${docDir}/${user.name.replace(/\s/g, '')}-${
                dict.teamNumber
            }-${dict.matchNumber}.json`;

            const jsonData = JSON.stringify(data, null, 4);

            await fs.writeFile(filePath, jsonData, 'utf8');

            Alert.alert('Match ' + dict.matchNumber + ' Saved!', '', [
                {text: 'New Match', onPress: () => setMatchCreated(false)},
                {
                    text: 'View Match',
                    onPress: () => {
                        setMatchCreated(false);
                        navigation.navigate('Data');
                    },
                },
                {text: 'OK', onPress: () => setMatchCreated(false)},
            ]);
        } catch (error) {
            console.error('Error saving data to file:', error.message);
        }
    };

    useBackHandler(() => {
        setMatchCreated(false);
        return true;
    });

    const backConfirm = () => {
        Alert.alert('You have unsaved changes', 'Continue without saving?', [
            {
                text: 'No',
            },
            {
                text: 'Yes',
                onPress: () => setMatchCreated(false),
                style: 'destructive',
            },
        ]);
    };

    const PrematchNavigate = props => {
        return <Prematch {...props} backConfirm={backConfirm} />;
    };

    const AutonNavigate = props => {
        return <Auton />;
    };

    const TeleopNavigate = props => {
        return <Teleop />;
    };

    const EndgameNavigate = props => {
        return <Endgame {...props} endMatch={endMatch} />;
    };

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.container}>
                <Tab.Navigator
                    initialRouteName="Pre-Match"
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: 'black',
                        },
                    }}>
                    <Tab.Screen name="Pre-Match">{PrematchNavigate}</Tab.Screen>
                    <Tab.Screen name="Auton">{AutonNavigate}</Tab.Screen>
                    <Tab.Screen name="Teleop">{TeleopNavigate}</Tab.Screen>
                    <Tab.Screen name="Endgame">{EndgameNavigate}</Tab.Screen>
                </Tab.Navigator>
            </View>
            <AnimationLoader
                isLoading={readyToPlaySuccessAnimation}
                loop={false}
                animationKey={'SUCCESS_01'}
                onAnimationComplete={() =>
                    setReadyToPlaySuccessAnimation(false)
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: RFValue(100),
        color: 'transparent',
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
    },
    container: {
        flex: 1,
    },
    sectionStyle: {
        alignItems: 'center',
        width: '100%',
    },
    patternSectionStyle: {
        backgroundColor: 'rgba(136, 3, 21, 1)',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    checkboxOnlyStyle: {
        alignItems: 'flex-start', // or 'baseline'
        width: '100%',
        size: 30,
        fillColor: 'green',
        unfillColor: '#FFFFFF',
        iconStyle: {borderColor: 'red', alignSelf: 'flex-start'},
        innerIconStyle: {borderWidth: 2},
        padding: 10,
        textStyle: {
            textDecorationLine: 'none',
            fontFamily: 'JosefinSans-Regular',
        },
        iconStyle: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            margin: 10,
        },
        tabView: {
            flex: 1,
            backgroundColor: '#3498db', // Example color
            borderWidth: 2, // Add a border to help identify the component boundaries
            borderColor: 'red', // Border color for visibility
        },
    },
});

export default ScoutingPage;
