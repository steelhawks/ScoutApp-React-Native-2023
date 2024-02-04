import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import fs from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import AnimationLoader from '../AnimationLoader';
import {launchImageLibrary} from 'react-native-image-picker';

// TODO
// Create a searching feature >> by name, date, match, team, etc
// Maybe add password protection
// Selection
// A nice UI to parse from the JSON so its not just a ugly JSON file
// maybe add a way to edit the files post match
// Make the names of the files not the json but the match number team number, and scouter name

const DataPage = ({ serverIp }) => {
    const docDir = fs.DocumentDirectoryPath;
    const [jsonFiles, setJsonFiles] = useState([]);
    const [jsonSelected, setJsonSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successfullySyncedWithServer, setSuccessfullySyncedWithServer] = useState(false);

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
        robotType: 'Empty', // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
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
    }, []); // Empty dependency array ensures this effect runs once on component mount

    const handleJsonSelection = async selectedJson => {
        try {
            const path = fs.DocumentDirectoryPath + '/' + selectedJson;
            console.log(path);
            const content = await fs.readFile(path, 'utf8');

            // Parse the JSON content and update the dictionary
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

        for (const index in jsonFiles) {
            const json = jsonFiles[index];
            const path = fs.DocumentDirectoryPath + '/' + json;
            const content = await fs.readFile(path, 'utf8');
            const jsonData = JSON.parse(content);

            if (!(await syncToServer(jsonData))) {
                break;
            }
        }

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

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.welcomeText}>Previous Matches</Text>
                    <TouchableOpacity onPress={handleSync}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Sync to Server
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.scrollContainer}>
                        {jsonFiles.map(file => (
                            <TouchableOpacity
                                key={file}
                                onPress={() => handleJsonSelection(file)}>
                                <Text style={styles.infoText}>{file}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {jsonSelected ? (
                        <Text style={styles.infoText}>
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
                            Auton Amp Notes Scored: {dict.autonAmpNotesScored}
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
                            Telop Amp Notes Scored: {dict.telopAmpNotesScored}
                            {'\n'}
                            Telop Amplified Speaker Notes:{' '}
                            {dict.telopAmplifiedSpeakerNotes}
                            {'\n'}
                            Telop Speaker Notes Missed:{' '}
                            {dict.telopSpeakerNotesMissed}
                            {'\n'}
                            Telop Amp Notes Missed: {dict.telopAmpNotesMissed}
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
                        <Text
                            style={{
                                paddingTop: 200,
                                fontSize: 20,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginBottom: 30,
                                color: 'white',
                            }}>
                            Select a JSON file to view the data
                        </Text>
                    )}
                </ScrollView>
            </View>
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34', // Change this to your desired background color
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    logoutButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    welcomeText: {
        paddingTop: 75,
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 30,
        color: 'white',
    },
    infoText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: '10%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default DataPage;
