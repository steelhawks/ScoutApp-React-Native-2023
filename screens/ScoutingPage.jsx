import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import RadioGroup from '../components/inputs/RadioGroup';
import Counter from '../components/inputs/Counter';
import fs from 'react-native-fs';
import {UserContext} from '..';
import Button from '../components/inputs/Button';
import {useBackHandler} from '@react-native-community/hooks';
import {RFValue} from 'react-native-responsive-fontsize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const [dict, setDict] = useState({
        eventName: eventName,
        scouterName: user.name,
        teamNumber: teamNumber,
        matchNumber: matchNumber,
        matchType: matchType, // qualification, practice, or elimination
        driveStation: driveStation,
        alliance: 'EMPTY', // red or blue
        preloaded: null, // true or false
        robotLeft: null, // true or false
        autonSpeakerNotesScored: 0,
        autonAmpNotesScored: 0,
        autonMissed: 0,
        autonNotesReceived: 0,
        autonIssues: [], // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        telopSpeakerNotesScored: 0,
        telopAmpNotesScored: 0,
        telopAmplifiedSpeakerNotes: 0,
        telopSpeakerNotesMissed: 0,
        telopAmpNotesMissed: 0,
        telopNotesReceivedFromHumanPlayer: 0,
        telopNotesReceivedFromGround: 0,
        endGame: 'EMPTY', // PARKED, ONSTAGE, SPOTLIGHT, Default: EMPTY
        trap: 0,
        penalties: [], // FOUL, TECH_FOUL, YELLOW_CARD, RED_CARD, Default: EMPTY
        telopIssues: [], // NOT_MOVING, LOST_CONNECTION, FMS_ISSUES, DISABLED, Default: EMPTY
        didTeamPlayDefense: null, // YES, NO, Default: null
        robotType: 'EMPTY', // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
        timeOfCreation: '',
    });

    const updateDict = (key, value) => {
        setIsLoading(true);
        setDict({...dict, [key]: value});
    };

    const handlePenalitiesSelect = value => {
        const updatedPenalities = [...dict.penalties];

        const penaltyIndex = updatedPenalities.indexOf(value);

        if (penaltyIndex !== -1) {
            updatedPenalities.splice(penaltyIndex, 1);
        } else {
            updatedPenalities.push(value);
        }

        updateDict('penalties', updatedPenalities);
    };

    const endMatch = () => {
        setIsLoading(true);
        setIsDone(true);

        const currentDate = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
        };
        const formatted = currentDate.toLocaleString('en-US', options);
        console.log('formatted:'+ formatted);

        setTimeout(async () => {
            updateDict('timeOfCreation', formatted);
            saveToJson(dict);
            setIsLoading(false);
            setIsDone(true);
        }, 500);
    };

    const saveToJson = async data => {
        try {
            const docDir = fs.DocumentDirectoryPath;
            const filePath = `${docDir}/scoutdata-${user.name.replace(
                /\s/g,
                '',
            )}-${dict.matchNumber}.json`;

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

    const prematch_queries = [
        <Query
            title="Alliance Color"
            item={<RadioGroup buttons={['Red', 'Blue']} id="alliance" />}
        />,
        <Query
            title="Preloaded?"
            item={<RadioGroup buttons={['Yes', 'No']} id="preloaded" />}
        />,
    ];

    const auton_queries = [
        <Query
            title="Did the robot leave?"
            item={<RadioGroup buttons={['Yes', 'No']} id="robotLeft" />}
        />,
        <Query
            title="Speaker Notes Scored"
            item={<Counter id="autonSpeakerNotesScored" />}
        />,
        <Query
            title="Amp Notes Scored"
            item={<Counter id="autonAmpNotesScored" />}
        />,
        <Query
            title="Notes Received"
            item={<Counter id="autonNotesReceived" />}
        />,
        <Query
            title="Auton Issues"
            item={<RadioGroup buttons={['Yes', 'No']} id="autonIssues" />}
        />,
    ];

    const tele_scoring_queries = [
        <Query
            title="Speaker Notes Scored"
            item={<Counter id="telopSpeakerNotesScored" />}
        />,
        <Query
            title="Amp Notes Scored"
            item={<Counter id="telopAmpNotesScored" />}
        />,
        <Query
            title="Amplified Speaker Notes Scored"
            item={<Counter id="telopAmplifiedSpeakerNotes" />}
        />,
    ];

    const tele_missed_queries = [
        <Query
            title="Auton Notes Missed"
            item={<Counter id="autonMissed" />}
        />,
        <Query
            title="Speaker Notes Missed"
            item={<Counter id="telopSpeakerNotesMissed" />}
        />,
        <Query
            title="Amp Notes Missed"
            item={<Counter id="telopAmpNotesMissed" />}
        />,
    ];

    const tele_received_queries = [
        <Query
            title="Note Received from Human Player"
            item={<Counter id="telopNotesReceivedFromHumanPlayer" />}
        />,
        <Query
            title="Note Received from Ground"
            item={<Counter id="telopNotesReceivedFromGround" />}
        />,
    ];

    const endgame_queries = [
        <Query
            title="Position"
            item={
                <RadioGroup
                    buttons={['Parked', 'Onstage', 'Spotlight']}
                    id="endGame"
                />
            }
        />,
        <Query title="Trap" item={<Counter id="trap" />} />,
        <Query
            title="Penalties"
            item={
                <>
                    <BouncyCheckbox
                        {...styles.checkboxOnlyStyle}
                        size={25}
                        text="Foul"
                        onPress={() => {
                            handlePenalitiesSelect('FOUL');
                        }}
                    />

                    <BouncyCheckbox
                        {...styles.checkboxOnlyStyle}
                        size={25}
                        text="Tech Foul"
                        onPress={() => {
                            handlePenalitiesSelect('TECH_FOUL');
                        }}
                    />
                    <BouncyCheckbox
                        {...styles.checkboxOnlyStyle}
                        size={25}
                        text="Yellow Card"
                        onPress={() => {
                            handlePenalitiesSelect('YELLOW_CARD');
                        }}
                    />
                    <BouncyCheckbox
                        {...styles.checkboxOnlyStyle}
                        size={25}
                        text="Red Card"
                        onPress={() => {
                            handlePenalitiesSelect('RED_CARD');
                        }}
                    />
                </>
            }
        />,
        <Query
            title="Teleop Issues"
            item={<RadioGroup buttons={['Yes', 'No']} id="telopIssues" />}
        />,
        <Query
            title="Defense"
            item={
                <RadioGroup buttons={['Yes', 'No']} id="didTeamPlayDefense" />
            }
        />,
        <Query
            title="Robot Type"
            item={
                <RadioGroup
                    buttons={['Amp Scorer', 'Speaker Scorer', 'Both']}
                    id="robotType"
                />
            }
        />,
    ];

    const form_sections = [
        <Section
            title={'Pre-Match'}
            queries={prematch_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Auton'}
            queries={auton_queries}
            style={[
                styles.sectionStyle,
                {backgroundColor: 'rgba(136, 3, 21, 1)'},
            ]}
        />,
        <Section
            title={'Teleop Scoring'}
            queries={tele_scoring_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Teleop Missed'}
            queries={tele_missed_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Teleop Received'}
            queries={tele_received_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Endgame'}
            queries={endgame_queries}
            style={styles.sectionStyle}
        />,
    ];

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

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <Button onPress={backConfirm} label="Cancel" />
                    <UserContext.Provider value={updateDict}>
                        <Form
                            sections={form_sections}
                            updateDict={updateDict}
                        />
                    </UserContext.Provider>
                    <Button onPress={() => endMatch()} label="End Match" />
                </ScrollView>
            </View>
            <AnimationLoader
                isLoading={isDone}
                loop={false}
                animationKey={'SUCCESS_01'}
                onAnimationComplete={() => setIsDone(false)}
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
    },
});

export default ScoutingPage;
