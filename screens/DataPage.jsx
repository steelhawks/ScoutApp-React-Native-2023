import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AnimationLoader from '../AnimationLoader';
import Button from '../components/inputs/Button';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import fs from 'react-native-fs';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDictStore, usePitDict} from '../contexts/dict';
import EmptyPage from './EmptyPage';

const DataPage = ({serverIp, navigation, setServerIp}) => {
    // zustand hooks
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    const pitDict = usePitDict(state => state.dict);
    const setPitDict = usePitDict(state => state.setDict);

    const [isPitScouting, setIsPitScouting] = useState(false);

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
            jsonData.matchNumber === 'PIT'
                ? (setPitDict(jsonData), setIsPitScouting(true))
                : (setDict(jsonData), setIsPitScouting(false));

            console.log(pitDict);
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

        if (serverIp === '101') {
            await new Promise(resolve => {
                Alert.prompt(
                    'You are logged in as an offline user.',
                    'Enter Server IP to sync.',
                    [
                        {text: 'Cancel'},
                        {
                            text: 'Connect',
                            onPress: async ip => {
                                setServerIp(ip);
                            },
                        },
                    ],
                );
            });
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
            setJsonSelected(false);
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

    const handleSwipeDelete = async file => {
        Alert.alert(
            'Are you sure you want to delete?',
            'This cannot be recovered',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        handleDelete(file);
                        setJsonSelected(false);
                    },
                    style: 'destructive',
                },
            ],
        );
    };

    const handleDelete = async file => {
        try {
            selectedJson = null;
            const filePath = fs.DocumentDirectoryPath + '/' + file;
            await fs.unlink(filePath);

            const updatedFiles = jsonFiles.filter(f => f !== file);
            setJsonFiles(updatedFiles);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const confirmDeleteAll = () => {
        if (jsonFiles.length === 0) {
            Alert.alert('No files to delete');
            return;
        }

        Alert.alert(
            'Are you sure you want to delete all?',
            'This cannot be recovered',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Delete All',
                    onPress: () => {
                        handleDeleteAll(true);
                        setJsonSelected(false);
                    },
                    style: 'destructive',
                },
            ],
        );
    };

    const handleDeleteAll = async () => {
        try {
            selectedJson = null;
            for (const index in jsonFiles) {
                const json = jsonFiles[index];
                if (json === 'teamData.json') {
                    continue;
                } // makes sure it doesnt delete sys files
                const path = fs.DocumentDirectoryPath + '/' + json;
                await fs.unlink(path);
            }
            setJsonFiles([]);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const matchScouting = [
        <Text style={styles.valueText}>
            Event Name: {dict.eventName}
            {'\n'}
            Scouter Name: {dict.scouterName}
            {'\n'}
            Team Number: {dict.teamNumber}
            {'\n'}
            Match Number: {dict.matchNumber}
            {'\n'}
            Match Type: {dict.matchType}
            {'\n'}
            Drive Station: {dict.driveStation}
            {'\n'}
            Alliance: {dict.alliance}
            {'\n'}
            Preloaded: {dict.preloaded}
            {'\n'}
            Robot Left: {dict.robotLeft}
            {'\n'}
            Auton Speaker Notes Scored: {dict.autonSpeakerNotesScored}
            {'\n'}
            Auton Amp Notes Scored: {dict.autonAmpNotesScored}
            {'\n'}
            Auton Missed: {dict.autonMissed}
            {'\n'}
            Auton Notes Received: {dict.autonNotesReceived}
            {'\n'}
            Auton Issues: {dict.autonIssues}
            {'\n'}
            Telop Speaker Notes Scored: {dict.telopSpeakerNotesScored}
            {'\n'}
            Telop Amp Notes Scored: {dict.telopAmpNotesScored}
            {'\n'}
            Telop Amplified Speaker Notes: {dict.telopAmplifiedSpeakerNotes}
            {'\n'}
            Telop Speaker Notes Missed: {dict.telopSpeakerNotesMissed}
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
            Fouls Received: {dict.fouls}
            {'\n'}
            Tech Fouls Received: {dict.techFouls}
            {'\n'}
            Yellow Cards Received: {dict.yellowCards}
            {'\n'}
            Red Cards Received: {dict.redCards}
            {'\n'}
            Teleop Issues: {dict.telopIssues}
            {'\n'}
            Did Team Play Defense: {dict.didTeamPlayDefense}
            {'\n'}
            Time of Creation: {dict.timeOfCreation}
            {'\n'}
        </Text>,
    ];

    const pitScouting = [
        <Text style={styles.valueText}>
            Event Name: {pitDict.eventName}
            {'\n'}
            Scouter Name: {pitDict.scouterName}
            {'\n'}
            Dimensions: {pitDict.dimensions}
            {'\n'}
            Weight: {pitDict.weight}
            {'\n'}
            Drivetrain: {pitDict.drivetrain}
            {'\n'}
            Intake: {pitDict.intake}
            {'\n'}
            Vision: {pitDict.vision}
            {'\n'}
            Auton: {pitDict.auton}
            {'\n'}
            Robot Excel: {pitDict.robotExcel}
            {'\n'}
            Trap Scorer: {pitDict.trapScorer}
            {'\n'}
            Time of Creation: {pitDict.timeOfCreation}
            {'\n'}
        </Text>,
    ];

    const empty_page = [
        <EmptyPage navigation={navigation}/>,
    ]

    const data_page = [
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Previous Matches</Text>
                <View style={styles.centerContent}>
                    <View
                        style={[styles.centerContent, {flexDirection: 'row'}]}>
                        <Button label="Sync to Server" onPress={handleSync} />
                        <Icon.Button
                            name="trash-2"
                            backgroundColor="transparent"
                            onPress={confirmDeleteAll}
                            size={RFValue(20)}
                            borderRadius={10}
                            iconStyle={styles.iconStyle}
                            style={styles.squareButton}
                        />
                    </View>
                    <View>
                        {jsonFiles.map(file => (
                            <Swipeable
                                overshootFriction={20}
                                key={file}
                                renderRightActions={() => (
                                    <TouchableOpacity
                                        style={styles.swipeDeleteButton}
                                        onPress={() => handleSwipeDelete(file)}>
                                        <Text style={styles.swipeDeleteText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                )}>
                                <TouchableOpacity
                                    style={styles.filesButton}
                                    onPress={() => handleJsonSelection(file)}>
                                    <Text style={styles.filesText}>{file}</Text>
                                </TouchableOpacity>
                            </Swipeable>
                        ))}
                    </View>

                    {jsonSelected ? (
                        isPitScouting ? (
                            pitScouting
                        ) : (
                            matchScouting
                        )
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
        </>,
    ];

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingBottom: RFValue(100),
                }}>
                {jsonFiles.length != 0 ? data_page : empty_page}
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
        borderRadius: RFValue(8),
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
        marginBottom: RFValue(10),
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

export default DataPage;
