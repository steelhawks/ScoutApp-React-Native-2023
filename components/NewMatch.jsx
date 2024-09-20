import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet, Alert, Image} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import Button from './inputs/Button';
import DriveStationUI from './inputs/DriveStationUI';
import {RFValue} from 'react-native-responsive-fontsize';
import AvoidKeyboardContainer from './AvoidKeyboardContainer';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropdownComponent from './inputs/DropdownComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDictStore, usePitDict} from '../contexts/dict.jsx';
import Icon from 'react-native-vector-icons/Feather';
import CounterBox from './inputs/CounterBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const NewMatch = ({
    teamData,
    setMatchCreated,
    setScoutingType,
    scoutingType,
    eventName,
    user,
    offlineMode,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const resetDict = useDictStore(state => state.resetDict);
    const resetPitDict = usePitDict(state => state.resetDict);

    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);
    const setPitDict = usePitDict(state => state.setDict);

    const [teamNumber, setTeamNumber] = useState(null);
    const [matchNumber, setMatchNumber] = useState(null);
    const [matchType, setMatchType] = useState(null);
    const [driveStation, setDriveStation] = useState(null);

    useEffect(async () => {
        if (JSON.parse(await AsyncStorage.getItem('biometric') === 'false') && !offlineMode) {
            Alert.alert(
                'Biometric Authentication',
                'Would you like to login with biometric authentication?',
                [
                    {
                        text: 'Yes',
                        onPress: async () => JSON.stringify(await AsyncStorage.setItem('biometric', 'true')),
                    },
                    {
                        text: 'No',
                        onPress: async () => JSON.stringify(await AsyncStorage.setItem('biometric', 'false')),
                    },
                ],
            );
        }
    }, []);

    const checkFilledOut = () => {
        return (
            teamNumber !== null &&
            matchNumber !== null &&
            matchType !== null &&
            driveStation !== null
        );
    };

    const handleStartScouting = async () => {
        resetDict(); // resets dict to default so match data doesnt overlap
        resetPitDict();
        if (scoutingType === 'Match Scouting') {
            if (checkFilledOut()) {
                setIsLoading(true);
                setTimeout(async () => {
                    setDict('scouterName', user.name);
                    setDict('eventName', eventName);
                    setDict('teamNumber', teamNumber);
                    setDict('matchNumber', matchNumber);
                    setDict('matchType', matchType);
                    setDict('driveStation', driveStation);
                    setDict('alliance', driveStation < 4 ? 'RED' : 'BLUE'); // red or blue
                    setMatchCreated(true);
                    setIsLoading(false);
                }, 1);
            } else {
                Alert.alert('Please fill out all fields.');
            }
        } else if (scoutingType === 'Pit Scouting') {
            if (teamNumber !== null) {
                setIsLoading(true);
                setTimeout(async () => {
                    setPitDict('eventName', eventName);
                    setPitDict('scouterName', user.name);
                    setPitDict('teamNumber', teamNumber);

                    setMatchCreated(true);
                    setIsLoading(false);
                }, 1);
            } else {
                Alert.alert('Please fill out the team number.');
            }
        }
    };

    const matchTypeData = [
        {label: 'Practice', value: 'PRACTICE'},
        {label: 'Qualification', value: 'QUALIFICATION'},
        {label: 'Elimination', value: 'ELIMINATION'},
        {label: 'Finals', value: 'FINALS'},
    ];

    const receivedTeamData = teamData.team_data.map(item => ({
        label: `${item.nickname} : ${item.team_number}`,
        value: item.team_number,
    }));

    const match_scouting = [
        <>
            <Text
                style={{
                    ...styles.title,
                    marginTop: 0,
                    paddingTop: RFValue(10),
                    fontSize: RFValue(15),
                }}>
                Enter Match Number:
            </Text>
            <CounterBox
                initial={dict.matchNumber + 1 || 1}
                min={1}
                max={1000}
                onChange={counter => {
                    setMatchNumber(counter);
                    // setDict('matchNumber', matchNumber);
                    console.log(counter);
                }}
            />

            <DropdownComponent
                initialValue={matchType}
                data={matchTypeData}
                placeholder={'Select Match Type'}
                // onValueChange={value => setDict('matchType', value)}
                onValueChange={value => setMatchType(value)}
            />

            <Text
                style={{
                    ...styles.title,
                    marginTop: 0,
                    paddingTop: RFValue(10),
                    fontSize: RFValue(15),
                }}>
                Select Drive Station
            </Text>
            <DriveStationUI
                initialValue={dict.driveStation || null}
                onChange={value => setDriveStation(value)}
                // onChange={value => setDriveStation(value)}
            />
        </>,
    ];

    const handleScoutSelect = () => {
        if (scoutingType === 'Match Scouting') {
            setScoutingType('Pit Scouting');
        } else if (scoutingType === 'Pit Scouting') {
            setScoutingType('Match Scouting');
        }
    };

    return (
        <>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        paddingBottom: RFValue(40),
                    }}>
                    <AvoidKeyboardContainer>
                        <View style={styles.avoidTabBar}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.title}>New Match</Text>
                                <View style={styles.centerContent}>
                                    <Text
                                        style={{
                                            ...styles.title,
                                            marginTop: 0,
                                            paddingTop: RFValue(10),
                                            fontSize: RFValue(15),
                                        }}>
                                        Select Match Type
                                    </Text>
                                    <Icon.Button
                                        padding={RFValue(8)}
                                        borderRadius={5}
                                        name={
                                            scoutingType === 'Match Scouting'
                                                ? 'play'
                                                : 'tag'
                                        }
                                        size={RFValue(25)}
                                        color="white"
                                        alignSelf="center"
                                        backgroundColor="rgba(136, 3, 21, 1)"
                                        underlayColor="transparent"
                                        // fontWeight="bold"
                                        // fontSize="20"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            backgroundColor: 'transparent',
                                            borderColor: 'transparent',
                                            zIndex: 1,
                                        }}
                                        onPress={handleScoutSelect}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: 'white',
                                            }}>
                                            {scoutingType}
                                        </Text>
                                    </Icon.Button>

                                    <DropdownComponent
                                        data={receivedTeamData}
                                        placeholder={'Select Team Number'}
                                        onValueChange={value =>
                                            setTeamNumber(value)
                                        }
                                        searchable={true}
                                    />

                                    {scoutingType === 'Match Scouting'
                                        ? match_scouting
                                        : null}

                                    <Button
                                        label={'Create Match'}
                                        onPress={handleStartScouting}
                                    />
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={require('../assets/hawk2.png')} style={styles.image} />
                                    </View>
                                </View>
                            </ScrollView>
                            <AnimationLoader isLoading={isLoading} />
                        </View>
                    </AvoidKeyboardContainer>
                </SafeAreaView>
            </GestureHandlerRootView>
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    avoidTabBar: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: RFValue(10),
        paddingBottom: RFValue(40),
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

    titleScreen: {
        position: 'absolute',
        // paddingBottom: 500,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    title: {
        paddingTop: RFValue(50),
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: 'white', // White text color for dark mode
        marginBottom: RFValue(20),
        textAlign: 'center',
    },
    createMatchButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: RFValue(20),
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default NewMatch;
