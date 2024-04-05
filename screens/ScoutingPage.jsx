/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import fs from 'react-native-fs';
import {useBackHandler} from '@react-native-community/hooks';
import {RFValue} from 'react-native-responsive-fontsize';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Auton from './Scouting/Auton';
import Teleop from './Scouting/Teleop';
import TeleopReceived from './Scouting/TeleopReceived';
import Endgame from './Scouting/Endgame';
import {useDictStore} from '../contexts/dict.jsx';
// import {fetchEventNameFromServer} from '../authentication/api';

const ScoutingPage = ({user, navigation, setMatchCreated, offlineMode}) => {
    const Tab = createMaterialTopTabNavigator();

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

    const [requiredQueriesCompleted, setRequiredQueriesCompleted] =
        useState(false);

    const [missingQueries, setMissingQueries] = useState([]);

    // define the required fields here
    // MAKE SURE THAT THEY ARE NULL IN THE DICT AS IT ONLY CHECKS
    // IF THE VALUE IS NULL!!!!!
    const requiredQueries = ['preloaded', 'robotLeft', 'didTeamPlayDefense'];

    // validation function to check if all required queries are completed
    // const validateQueries = () => {
    //     // check if all required queries have values
    //     const allQueriesCompleted = requiredQueries.every(query => {
    //         return dict[query] !== null && dict[query] !== '';
    //     });
    //     setRequiredQueriesCompleted(allQueriesCompleted);
    // };

    const validateQueries = () => {
        // initialize an array to store the names of missing queries
        const missingQueriesArray = [];
        // check each required query
        requiredQueries.forEach(query => {
            // check if the value is null or an empty string
            if (dict[query] === null || dict[query] === '') {
                // if the value is missing, add the query name to the array
                missingQueriesArray.push(query);
            }
        });
        // set the missingQueries state with the array of missing query names
        setMissingQueries(missingQueriesArray);
        // check if all required queries are completed
        const allQueriesCompleted = missingQueriesArray.length === 0;
        setRequiredQueriesCompleted(allQueriesCompleted);
    };

    useEffect(() => {
        validateQueries();
    }, [dict]);

    const endMatch = async () => {
        if (requiredQueriesCompleted) {
            setReadyToPlaySuccessAnimation(true);
            setIsDone(true);
            setDict('timeOfCreation', currentDate);
        } else {
            console.log(missingQueries);
            Alert.alert(
                'Please complete all required fields',
                `${getFormattedMissingQueries()}`,
            );
        }
    };

    const getFormattedMissingQueries = () => {
        // Capitalize the first letter of each word in each query
        const formattedQueries = missingQueries.map(query => {
            // Split the query name into words
            const words = query.split(/(?=[A-Z])/);
            // Capitalize the first letter of each word and join them without spaces
            const formattedQuery = words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
            return formattedQuery;
        });

        // Join the formatted queries with commas and "and" for the last query
        const formattedList = formattedQueries
            .join(', ')
            .replace(/,([^,]*)$/, ' and$1');

        return `You are missing ${formattedList}.`;
    };

    useEffect(() => {
        if (isDone) {
            saveToJson(dict);
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

    const AutonNavigate = props => {
        return <Auton {...props} backConfirm={backConfirm} />;
    };

    const TeleopNavigate = () => {
        return <Teleop />;
    };

    const TeleopReceivedNavigate = props => {
        return <TeleopReceived />;
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
                    <Tab.Screen name="Auton">{AutonNavigate}</Tab.Screen>
                    <Tab.Screen name="Teleop Scoring">
                        {TeleopNavigate}
                    </Tab.Screen>
                    <Tab.Screen name="Teleop Received">
                        {TeleopReceivedNavigate}
                    </Tab.Screen>
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
