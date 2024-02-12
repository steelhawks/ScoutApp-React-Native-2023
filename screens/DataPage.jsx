import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AnimationLoader from '../AnimationLoader';
import Button from '../components/inputs/Button';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import fs from 'react-native-fs';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const DataPage = ({ serverIp, navigation }) => {
    useFocusEffect(
        React.useCallback(() => {
            // fetch and set the list of JSON files in the directory
            fs.readdir(docDir)
                .then(files => {
                    const jsonFiles = files.filter(file =>
                        file.endsWith('.json'),
                    );
                    setJsonFiles(jsonFiles);
                })
                .catch(error => {
                    console.error('Error reading directory:', error);
                });
        }, [docDir]),
    );

    const docDir = fs.DocumentDirectoryPath;
    const [jsonFiles, setJsonFiles] = useState([]);
    const [jsonSelected, setJsonSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successfullySyncedWithServer, setSuccessfullySyncedWithServer] =
        useState(false);

    const [dict, setDict] = useState({
        scouterName: '',
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

    // use this to change values after the match
    const updateDict = (key, value) => {
        setDict({...dict, [key]: value});
    };

    useEffect(() => {
        // Fetch and set the list of JSON files in the directory
        fs.readdir(docDir)
            .then(files => {
                const jsonFiles = files.filter(file => file.endsWith('.json'));
                setJsonFiles(jsonFiles);
            })
            .catch(error => {
                console.error('Error reading directory:', error);
            });
    }, []); // empty dependency array ensures this effect runs once on component mount

    const handleJsonSelection = async selectedJson => {
        try {
            const path = fs.DocumentDirectoryPath + '/' + selectedJson;
            const content = await fs.readFile(path, 'utf8');

            // parses the JSON content and updates the dictionary
            const jsonData = JSON.parse(content);
            setDict(jsonData);

            // updates the boolean to false when the selected json is deselected
            setJsonSelected(prev =>
                prev === selectedJson ? '' : selectedJson,
            );
        } catch (error) {
            console.error('Error reading or parsing JSON file:', error);
        }
    };

    const handleSync = async () => {
        const response = null;
        
        if (jsonFiles.length === 0) {
            Alert.alert('No files to upload', '', [
                {
                    text: 'Create a Match',
                    onPress: () => {
                        navigation.navigate('New Match');
                    },
                },
                {text: 'OK'},
            ]);
            return;
        }
        for (const index in jsonFiles) {
            const json = jsonFiles[index];
            const path = fs.DocumentDirectoryPath + '/' + json;
            const content = await fs.readFile(path, 'utf8');
            const jsonData = JSON.parse(content);

            if (!(await syncToServer(jsonData))) {
                break;
            }
        }

        Alert.alert('Syncing Successful', '', [
            {
                text: 'Create Another Match',
                onPress: () => {
                    navigation.navigate('New Match');
                },
            },
            {text: 'OK'},
        ]);

        if (response) {
            setIsLoading(false);
            setSuccessfullySyncedWithServer(true);
        }
    };

    const syncToServer = async data => {
        setIsLoading(true);

        try {
            const serverEndpoint = `http://${serverIp}:8080/upload`;

            const response = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Server Response:', response);

            if (response.ok) {
                console.log('Data successfully synced to server.');
                // if post request is successful continue loop
                return true;
            }
        } catch (error) {
            Alert.alert('Error syncing to server: ' + error, '', [
                {text: 'Close'},
            ]);
            console.error('Error syncing to server:', error);
            // if post request fails end the loop
            setIsLoading(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwipeDelete = async (file) => {
        try {
            selectedJson = null;
            const filePath = fs.DocumentDirectoryPath + '/' + file;
            await fs.unlink(filePath);

            // Update the file list after deletion
            const updatedFiles = jsonFiles.filter((f) => f !== file);
            setJsonFiles(updatedFiles);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Previous Matches</Text>
                <View style={styles.centerContent}>
                    <Button label="Sync to Server" onPress={handleSync} />
                    <View style={styles.scrollContainer}>
                        {jsonFiles.map(file => (
                            <Swipeable
                                key={file}
                                renderRightActions={() => (
                                    <TouchableOpacity
                                        style={styles.swipeDeleteButton}
                                        onPress={() => handleSwipeDelete(file)}>
                                        <Text style={styles.swipeDeleteText}>Delete</Text>
                                    </TouchableOpacity>
                                )}>
                                <TouchableOpacity
                                    onPress={() => handleJsonSelection(file)}>
                                    <Text style={styles.filesText}>{file}</Text>
                                </TouchableOpacity>
                            </Swipeable>
                        ))}
                    </View>

                    {jsonSelected ? (
                        <Text style={styles.filesText}>
                                Event Name: {dict.eventName}
                                {'\n'}
                                Scouter Name: {dict.scouterName}
                                {'\n'}
                                Team Number: {dict.teamNumber}
                                {'\n'}
                                Match Number: {dict.matchNumber}
                                {'\n'}
                                Drive Station: {dict.driveStation}
                                {'\n'}
                                Alliance: {dict.alliance}
                                {'\n'}
                                Preloaded: {dict.preloaded}
                                {'\n'}
                                Robot Left: {dict.robotLeft}
                                {'\n'}
                                Auton Speaker Notes Scored:{' '}
                                {dict.autonSpeakerNotesScored}
                                {'\n'}
                                Auton Amp Notes Scored:{' '}
                                {dict.autonAmpNotesScored}
                                {'\n'}
                                Auton Missed: {dict.autonMissed}
                                {'\n'}
                                Auton Notes Received: {dict.autonNotesReceived}
                                {'\n'}
                                Auton Issues: {dict.autonIssues}
                                {'\n'}
                                Telop Speaker Notes Scored:{' '}
                                {dict.telopSpeakerNotesScored}
                                {'\n'}
                                Telop Amp Notes Scored:{' '}
                                {dict.telopAmpNotesScored}
                                {'\n'}
                                Telop Amplified Speaker Notes:{' '}
                                {dict.telopAmplifiedSpeakerNotes}
                                {'\n'}
                                Telop Speaker Notes Missed:{' '}
                                {dict.telopSpeakerNotesMissed}
                                {'\n'}
                                Telop Amp Notes Missed:{' '}
                                {dict.telopAmpNotesMissed}
                                {'\n'}
                                Telop Notes Received From Human Player:{' '}
                                {dict.telopNotesReceivedFromHumanPlayer}
                                {'\n'}
                                Telop Notes Received From Ground:{' '}
                                {dict.telopNotesReceivedFromGround}
                                {'\n'}
                                End Game: {dict.endGame}
                                {'\n'}
                                Trap: {dict.trap}
                                {'\n'}
                                Penalties: {dict.penalties}
                                {'\n'}
                                Telop Issues: {dict.telopIssues}
                                {'\n'}
                                Did Team Play Defense: {dict.didTeamPlayDefense}
                                {'\n'}
                                What Type of Robot: {dict.robotType}
                                {'\n'}
                        </Text>
                    ) : (
                        <Text style={styles.infoText}>
                            Select a JSON file to view the data
                        </Text>
                    )}
                </View>
            </ScrollView>
            <AnimationLoader isLoading={isLoading} />
            {successfullySyncedWithServer ? (
                <AnimationLoader
                    isLoading={successfullySyncedWithServer}
                    animationKey="SUCCESS_01"
                    loop={false}
                    onAnimationComplete={() =>
                        setSuccessfullySyncedWithServer(false)
                    }
                />
            ) : null}
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        position: 'absolute',
        paddingTop: RFValue(100),
        fontSize: RFValue(36),
        fontWeight: 'bold',
        marginBottom: RFValue(50),
        color: 'white',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282c34',
    },
    centerContent: {
        paddingTop: RFValue(300),
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    filesText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: RFValue(0),
    },
    swipeDeleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    swipeDeleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DataPage;
