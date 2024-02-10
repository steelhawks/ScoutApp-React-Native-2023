import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewMatch from '../components/NewMatch';
import AnimationLoader from '../AnimationLoader';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import RadioGroup from '../components/inputs/RadioGroup';
import CounterInput from 'react-native-counter-input';
import Counter from '../components/inputs/Counter';
import fs from 'react-native-fs';
import {UserContext} from '..';
import Button from '../components/inputs/Button';

const ScoutingPage = ({
    logged_in,
    setLogin,
    user,
    navigation,
    competitionName,
}) => {
    const [matchCreated, setMatchCreated] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [eventName, setEventName] = useState(competitionName);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        // Update the formatted date every second
        const interval = setInterval(() => {
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
            setFormattedDate(formatted);
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array to run the effect only once on mount

    const [dict, setDict] = useState({
        eventName: eventName,
        scouterName: user.name,
        teamNumber: 0,
        matchNumber: 0,
        driveStation: 0,
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
        endGame: [], // PARKED, ONSTAGE, SPOTLIGHT, Default: EMPTY
        trap: 0,
        penalties: [], // FOUL, TECH_FOUL, YELLOW_CARD, RED_CARD, Default: EMPTY
        telopIssues: [], // NOT_MOVING, LOST_CONNECTION, FMS_ISSUES, DISABLED, Default: EMPTY
        didTeamPlayDefense: null, // YES, NO, Default: null
        robotType: [], // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
    });

    const updateDict = (key, value) => {
        setIsLoading(true);
        setDict({...dict, [key]: value});
    };

    const endMatch = () => {
        setIsLoading(true);
        setIsDone(true);

        setTimeout(async () => {
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

            console.log('File saved!');

            Alert.alert('Match ' + dict.matchNumber + ' Saved!', '', [
                {text: 'New Match', onPress: () => setMatchCreated(false)},
                {
                    text: 'View Match',
                    onPress: () => {
                        setMatchCreated(false);
                        navigation.navigate('Data');
                    },
                },
                {text: 'OK'},
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
                <RadioGroup
                    buttons={['Foul', 'Tech Foul', 'Yellow Card', 'Red Card']}
                    id="penalties"
                />
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
        <Section title={'Pre-Match'} queries={prematch_queries} style={styles.sectionStyle}/>,
        <Section title={'Auton'} queries={auton_queries} style={[styles.sectionStyle, {backgroundColor: 'rgba(136, 3, 21, 1)'}]}/>,
        <Section title={'Teleop Scoring'} queries={tele_scoring_queries} style={styles.sectionStyle}/>,
        <Section title={'Teleop Missed'} queries={tele_missed_queries} style={styles.sectionStyle}/>,
        <Section title={'Teleop Received'} queries={tele_received_queries} style={styles.sectionStyle}/>,
        <Section title={'Endgame'} queries={endgame_queries} style={styles.sectionStyle}/>,
    ];

    return (
        <SafeAreaView style={styles.mainView}>
            {matchCreated ? (
                <View style={styles.container}>
                    <ScrollView>
                        <Button
                            onPress={() => setMatchCreated(false)}
                            label="Back"
                        />
                        <UserContext.Provider value={updateDict}>
                            <Form
                                sections={form_sections}
                                updateDict={updateDict}
                            />
                        </UserContext.Provider>
                        <Button onPress={() => endMatch()} label="End Match" />
                    </ScrollView>
                </View>
            ) : (
                <NewMatch
                    setMatchCreated={setMatchCreated}
                    user={user}
                    dict={dict}
                    updateDict={updateDict}
                    eventName={eventName}
                />
            )}
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
    },
    container: {
        flex: 1,
    },
    sectionStyle: {
       alignItems: 'center',
        width: "100%"
    },
    
});

export default ScoutingPage;
