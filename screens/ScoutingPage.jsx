import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../components/Input';
import {useState} from 'react';
import NumberInput from '../components/inputs/NumberInput';
import NewMatch from '../components/NewMatch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import BouncyCheckboxGroup, {
    ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
// import Counter from '../components/inputs/Counter'; // Deprecated
import CounterInput from 'react-native-counter-input';
import {ScrollView} from 'react-native-gesture-handler';
import fs from 'react-native-fs';

const ScoutingPage = props => {
    const [matchCreated, setMatchCreated] = useState(false);

    const [dict, setDict] = useState({
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
    });

    const [newNumVal, setNewNumVal] = useState(0);

    const updateDict = (key, value) => {
        setDict({...dict, [key]: value});
    };

    const number = newNumVal => {
        setNewNumVal(newNumVal);
    };

    const endMatch = () => {
        saveToJson(dict, 'data');
    };

    const saveToJson = async (data, fileName) => {
        try {
            const docDir = fs.DocumentDirectoryPath;
            const filePath = `${docDir}/${fileName}.json`;
            const jsonData = JSON.stringify(data);

            await fs.writeFile(filePath, jsonData, 'utf8');

            console.log('File saved!');
        } catch (error) {
            console.error('Error saving data to file:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.MainView}>
            {matchCreated ? (
                // Prematch Section
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

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Alliance Color
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: 'yes',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Red',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('alliance', 'red');
                                    },
                                },
                                {
                                    id: 'no',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'Blue',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('alliance', 'blue');
                                    },
                                },
                            ]}
                            onChange={selectedItem => {
                                console.log(
                                    'SelectedItem: ',
                                    JSON.stringify(selectedItem),
                                );
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Preloaded?
                        </Text>
                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: 'yes',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Yes',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('preloaded', true);
                                    },
                                },
                                {
                                    id: 'no',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'No',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('preloaded', false);
                                    },
                                },
                            ]}
                            onChange={selectedItem => {
                                console.log(
                                    'SelectedItem: ',
                                    JSON.stringify(selectedItem),
                                );
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Auton
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Did the robot leave?
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: 'yes',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Yes',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('robotLeft', true);
                                    },
                                },
                                {
                                    id: 'no',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'No',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('robotLeft', false);
                                    },
                                },
                            ]}
                            onChange={selectedItem => {
                                console.log(
                                    'SelectedItem: ',
                                    JSON.stringify(selectedItem),
                                );
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Speaker Notes Scored
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('autonSpeakerNotesScored', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Amp Notes Scored
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('autonAmpNotesScored', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Missed
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('autonMissed', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Notes Received
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('autonNotesReceived', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Auton Issues
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: '0',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Not Moving',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('autonIssues', 'NOT_MOVING');
                                    },
                                },
                                {
                                    id: '1',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'Stopped',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('autonIssues', 'STOPPED');
                                    },
                                },
                                {
                                    id: '2',
                                    size: 25,
                                    fillColor: 'green',
                                    unfillColor: '#FFFFFF',
                                    text: 'Out of Control',
                                    iconStyle: {borderColor: 'green'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict(
                                            'autonIssues',
                                            'OUT_OF_CONTROL',
                                        );
                                    },
                                },
                            ]}
                        />

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Teleop Scoring
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Speaker Notes Scored
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('telopSpeakerNotesScored', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Amp Notes Scored
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('telopAmpNotesScored', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Amplified Speaker Notes
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict(
                                    'telopAmplifiedSpeakerNotes',
                                    counter,
                                );
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Teleop Missed
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Speaker Notes Missed
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('telopSpeakerNotesMissed', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Amp Notes Missed
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('telopAmpNotesMissed', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Teleop Receiving
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Note Received From Human Player
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict(
                                    'telopNoteReceivedFromHumanPlayer',
                                    counter,
                                );
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Notes Received From Ground
                        </Text>

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Endgame
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Endgame
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: '0',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Parked',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('endGame', 'PARKED');
                                    },
                                },
                                {
                                    id: '1',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'Onstage',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('endGame', 'ONSTAGE');
                                    },
                                },
                                {
                                    id: '2',
                                    size: 25,
                                    fillColor: 'green',
                                    unfillColor: '#FFFFFF',
                                    text: 'Spotlight',
                                    iconStyle: {borderColor: 'green'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('endGame', 'SPOTLIGHT');
                                    },
                                },
                            ]}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Trap
                        </Text>

                        <CounterInput
                            min={0}
                            horizontal={true}
                            onChange={counter => {
                                updateDict('trap', counter);
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Penalties
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: '0',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Foul',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('penalties', 'FOUL');
                                    },
                                },
                                {
                                    id: '1',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'Tech Foul',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('penalties', 'TECH_FOUL');
                                    },
                                },
                                {
                                    id: '2',
                                    size: 25,
                                    fillColor: 'green',
                                    unfillColor: '#FFFFFF',
                                    text: 'Yellow Card',
                                    iconStyle: {borderColor: 'green'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('penalties', 'YELLOW_CARD');
                                    },
                                },
                                {
                                    id: '3',
                                    size: 25,
                                    fillColor: 'purple',
                                    unfillColor: '#FFFFFF',
                                    text: 'Red Card',
                                    iconStyle: {borderColor: 'purple'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('penalties', 'RED_CARD');
                                    },
                                },
                            ]}
                        />

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Telop Issues
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: '0',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Not Moving',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('telopIssues', 'NOT_MOVING');
                                    },
                                },
                                {
                                    id: '1',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'Lost Connection',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict(
                                            'telopIssues',
                                            'LOST_CONNECTION',
                                        );
                                    },
                                },
                                {
                                    id: '2',
                                    size: 25,
                                    fillColor: 'green',
                                    unfillColor: '#FFFFFF',
                                    text: 'FMS Issues',
                                    iconStyle: {borderColor: 'green'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('telopIssues', 'FMS_ISSUES');
                                    },
                                },
                                {
                                    id: '3',
                                    size: 25,
                                    fillColor: 'purple',
                                    unfillColor: '#FFFFFF',
                                    text: 'Disabled',
                                    iconStyle: {borderColor: 'purple'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('telopIssues', 'DISABLED');
                                    },
                                },
                            ]}
                        />

                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                // marginBottom: 50,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Defense
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                alignSelf: 'left',
                                marginBottom: 25,
                                marginLeft: 20,
                                color: 'white',
                            }}>
                            Did this team play defense?
                        </Text>

                        <BouncyCheckboxGroup
                            data={[
                                {
                                    id: '0',
                                    size: 25,
                                    fillColor: 'red',
                                    unfillColor: '#FFFFFF',
                                    text: 'Yes',
                                    iconStyle: {borderColor: 'red'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('didTeamPlayDefense', true);
                                    },
                                },
                                {
                                    id: '1',
                                    size: 25,
                                    fillColor: 'blue',
                                    unfillColor: '#FFFFFF',
                                    text: 'No',
                                    iconStyle: {borderColor: 'blue'},
                                    innerIconStyle: {borderWidth: 2},
                                    textStyle: {
                                        fontFamily: 'JosefinSans-Regular',
                                    },
                                    onChange: selectedItem => {
                                        console.log(selectedItem);
                                        updateDict('didTeamPlayDefense', false);
                                    },
                                },
                            ]}
                        />

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
                <NewMatch setMatchCreated={setMatchCreated} />
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
