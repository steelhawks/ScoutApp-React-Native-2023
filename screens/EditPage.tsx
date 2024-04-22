import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AndroidPrompt from '../components/AndroidPrompt';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Button from '../components/inputs/Button';
import fs from 'react-native-fs';

type RouteParams = {
    file: string;
};

const docDir = fs.DocumentDirectoryPath;
const hiddenKeys = ['timeOfCreation'];

const EditPage = () => {
    const route = useRoute(); // use the useRoute hook to get the route object
    const params = route.params as RouteParams; // cast route.params to the defined type
    const file = params.file; // access the file parameter from the route.params object

    const [fileValues, setFileValues] = useState<string[]>([]);
    const [fileKeys, setFileKeys] = useState<string[]>([]);
    const [isMatchData, setIsMatchData] = useState<boolean>(false);

    useEffect(() => {
        // Read the file and set the file data
        const readFile = async () => {
            try {
                const path = docDir + '/' + file;
                console.log('Path to file', path);
                const content = await fs.readFile(path, 'utf8');

                const jsonData = JSON.parse(content);
                console.log('JSON Data', Object.values(jsonData));
                setFileKeys(Object.keys(jsonData));
                setFileValues(Object.values(jsonData));

                {
                    jsonData.matchNumber === 'PIT'
                        ? setIsMatchData(false)
                        : setIsMatchData(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        readFile();
    }, []);

    const handleFieldEdit = (key: any, data: string, index: number) => {
        console.log('Field Edit', key, data);
        if (Platform.OS === 'ios') {
            Alert.prompt(
                'Edit Field',
                'Enter the new value for this field',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: (value?: string | undefined) => {
                            if (value) {
                                const newFileValues = [...fileValues]; // create a new array
                                newFileValues[index] = value; // update the value at the specified index
                                setFileValues(newFileValues); // set the state with the new array
                            }
                        },
                    },
                ],
                'plain-text',
                data,
            );
        } else {
            <AndroidPrompt
                visible={true}
                onClose={() => console.log('Close Pressed')}
                onSubmit={text => {
                    console.log('OK Pressed', text);
                    const newFileValues = fileValues;
                    newFileValues[index] = text;
                    setFileValues(newFileValues);
                }}
            />;
        }
    };

    const saveChanges = async () => {
        try {
            const path = docDir + '/' + file;
            const data: { [key: string]: string } = {}; // add index signature to the type of the data object
            fileKeys.forEach((key, index) => {
                data[key] = fileValues[index];
            });
            const jsonData = JSON.stringify(data, null, 2);
            await fs.writeFile(path, jsonData, 'utf8');
            console.log('File Updated');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingBottom: RFValue(100),
                }}>
                <ScrollView
                    style={{
                        width: '100%',
                        padding: RFValue(16),
                    }}>
                    <Text style={styles.title}>Edit Match</Text>
                    <View style={styles.centerContent}>
                        <Button
                            label="Edit Match"
                            onPress={() => {
                                console.log(file);
                            }}
                        />
                        {fileKeys.map((line, index) => {
                            if (!hiddenKeys.includes(line)) {
                                return (
                                    <>
                                        <Text style={styles.text}>{line}</Text>
                                        <Button
                                            // index={index}
                                            label={fileValues[index]}
                                            onPress={() => {
                                                handleFieldEdit(
                                                    line,
                                                    fileValues[index],
                                                    index,
                                                );
                                            }}
                                        />
                                    </>
                                );
                            }
                            return null;
                        })}
                        <Button
                            label="Save Changes"
                            style={{marginBottom: 100}}
                            onPress={() => {
                                saveChanges();
                            }}
                        />
                    </View>
                </ScrollView>
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
    text: {
        paddingTop: RFValue(50),
        fontSize: RFValue(20),
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
        // backgroundColor: 'transparent',
        // borderColor: 'transparent',
        zIndex: 1,

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
        marginBottom: RFValue(-19),
        elevation: 5,
    },
    swipeSyncButton: {
        backgroundColor: 'lightblue',
        padding: RFValue(14),
        borderRadius: RFValue(8),
        width: '50%',
        alignSelf: 'center',
        marginTop: RFValue(10),
        marginBottom: RFValue(-19),
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

export default EditPage;
