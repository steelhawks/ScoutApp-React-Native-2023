import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert
} from 'react-native';
import React from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Input from '../components/Input';
import {useState, useEffect} from 'react';
import NumberInput from '../components/inputs/NumberInput';
import NewMatch from '../components/NewMatch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import {Dropdown} from 'react-native-element-dropdown';
import Counter from '../components/inputs/Counter';
import {ScrollView} from 'react-native-gesture-handler';
import fs from 'react-native-fs';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import RadioGroup from '../components/inputs/RadioGroup';
import CounterInput from 'react-native-counter-input';
import { UserContext } from '..';

const ScoutingPage = ({props, logged_in, setLogin, user}) => {
    const [matchCreated, setMatchCreated] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');

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
        autonIssues: 'EMPTY', // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        telopSpeakerNotesScored: 0,
        telopAmpNotesScored: 0,
        telopAmplifiedSpeakerNotes: 0,
        telopSpeakerNotesMissed: 0,
        telopAmpNotesMissed: 0,
        telopNotesReceivedFromHumanPlayer: 0,
        telopNotesReceivedFromGround: 0,
        endGame: 'EMPTY', // PARKED, ONSTAGE, SPOTLIGHT, Default: EMPTY
        trap: 0,
        penalties: 'EMPTY', // FOUL, TECH_FOUL, YELLOW_CARD, RED_CARD, Default: EMPTY
        telopIssues: 'EMPTY', // NOT_MOVING, LOST_CONNECTION, FMS_ISSUES, DISABLED, Default: EMPTY
        didTeamPlayDefense: null, // YES, NO, Default: null
        robotType: 'EMPTY' // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
    });

    const updateDict = (key, value) => {
        setDict({...dict, [key]: value});
    };

    const endMatch = () => {
        saveToJson(dict);
    };

    const saveToJson = async data => {
        try {
            const docDir = fs.DocumentDirectoryPath;
            const filePath = `${docDir}/scoutdata-${user.name.replace(/\s/g, '')}-${dict.matchNumber}.json`;

            const jsonData = JSON.stringify(data, null, 4);

            await fs.writeFile(filePath, jsonData, 'utf8');

            console.log('File saved!');
            Alert.alert('Match ' + dict.matchNumber + ' Saved!', '', [
                {text: 'New Match', onPress: () => setMatchCreated(false)},
                {text: 'View Match', onPress: () => setMatchCreated(false)},
                {text: 'OK'},
            ]);
        } catch (error) {
            console.error('Error saving data to file:', error.message);
        }
    };

    const prematch_queries = [
        <Query
            title="Alliance Color"
            item={<RadioGroup buttons={['Red', 'Blue']} id="alliance"/>}
        />,
        <Query
            title="Preloaded?"
            item={<RadioGroup buttons={['Yes', 'No']} id="preloaded"/>}
        />,
    ];

    const auton_queries = [
        <Query
            title="Did the robot leave?"
            item={<RadioGroup buttons={['Yes', 'No']} id="robotLeft"/>}
        />,
        <Query title="Speaker Notes Scored" item={<Counter id="autonSpeakerNotesScored"/>} />,
        <Query title="Amp Notes Scored" item={<Counter id="autonAmpNotesScored"/>} />,
        <Query title="Missed" item={<Counter id="autonMissed"/>} />,
        <Query title="Notes Received" item={<Counter id="autonNotesReceived"/>} />,
        <Query
            title="Auton Issues"
            item={<RadioGroup buttons={['Yes', 'No']} id="autonIssues"/>}
        />,
    ];

    const tele_scoring_queries = [
        <Query title="Speaker Notes Scored" item={<Counter id="telopSpeakerNotesScored"/>} />,
        <Query title="Amp Notes Scored" item={<Counter id="telopAmpNotesScored"/>} />,
        <Query title="Amplified Speaker Notes Scored" item={<Counter id="telopAmplifiedSpeakerNotes"/>} />,
    ];

    const tele_missed_queries = [
        <Query title="Speaker Notes Missed" item={<Counter id="telopSpeakerNotesMissed"/>} />,
        <Query title="Amp Notes Missed" item={<Counter id="telopAmpNotesMissed"/>} />,
    ];

    const tele_received_queries = [
        <Query title="Note Received from Human Player" item={<Counter id="telopNotesReceivedFromHumanPlayer"/>} />,
        <Query title="Note Received from Ground" item={<Counter id="telopNotesReceivedFromGround"/>} />,
    ];

    const endgame_queries = [
        <Query
            title="Position"
            item={<RadioGroup buttons={['Parked', 'Onstage', 'Spotlight']} id="endGame"/>}
        />,
        <Query title="Trap" item={<Counter id="trap"/>} />,
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
            item={
                <RadioGroup
                    buttons={[
                        'Not Moving',
                        'Lost Connection',
                        'FMS Issues',
                        'Disabled',
                    ]}
                    id="telopIssues"
                />
            }
        />,
        <Query title="Defense" item={<RadioGroup buttons={['Yes', 'No']} id="didTeamPlayDefense" />} />,
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
        <Section title={'Pre Match'} queries={prematch_queries} />,
        <Section title={'Auton'} queries={auton_queries} />,
        <Section title={'Teleop Scoring'} queries={tele_scoring_queries} />,
        <Section title={'Teleop Missed'} queries={tele_missed_queries} />,
        <Section title={'Teleop Received'} queries={tele_received_queries} />,
        <Section title={'Endgame'} queries={endgame_queries} />,
    ];

    return (
        <SafeAreaView style={styles.MainView}>
            {matchCreated ? (
                <View>
                    <ScrollView>
                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Pre Match
                        </Text>

                        <TouchableOpacity
                            onPress={() => setMatchCreated(false)}>
                        <TouchableOpacity
                            onPress={() => setMatchCreated(false)}>
                            <View
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: 15,
                                    borderRadius: 5,
                                    marginBottom: 20,
                                    marginLeft: 250,
                                    width: '10%', // Set the width as needed
                                    right: 220,
                                }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 20,
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                    Back
                                    Back
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <UserContext.Provider value={updateDict}>
                            <Form sections={form_sections} updateDict={updateDict}/>
                        </UserContext.Provider>

                        <TouchableOpacity onPress={() => endMatch()}>
                            <View
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: 15,
                                    borderRadius: 5,
                                    marginBottom: 20,
                                    marginLeft: 250,
                                    width: '10%', // Set the width as needed
                                }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 20,
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                    End Match
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            ) : (
                <NewMatch
                    setMatchCreated={setMatchCreated}
                    user={user}
                    updateDict={updateDict}
                />
            )}
        </SafeAreaView>
    );
};

export default ScoutingPage;

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: 'black',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
});
