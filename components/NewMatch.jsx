import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';
import Dropdown from './inputs/Dropdown';
import ScoutingPage from '../screens/ScoutingPage';
import {ScrollView} from 'react-native-gesture-handler';
import CounterInput from 'react-native-counter-input';

const NewMatch = props => {
    // const [teamNumber, setTeamNumber] = useState(0);
    // const [matchNumber, setMatchNumber] = useState(0);
    // const [driveStation, setDriveStation] = useState(0);

    return (
        <View style={styles.background}>
            <ScrollView>
                <Text
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        alignSelf: 'left',
                        marginBottom: 50,
                        marginLeft: 20,
                        color: 'white',
                    }}>
                    Hello {props.user.name}!{'\n'}
                    OSIS: {props.user.osis}
                </Text>

                <Text
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        alignSelf: 'left',
                        marginBottom: 50,
                        marginLeft: 20,
                        color: 'white',
                    }}>
                    Enter Team Number:
                </Text>

                <TextInput
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginBottom: 10,
                        marginLeft: 60,
                        width: '40%', // Set the width as needed
                        color: 'white',
                    }}
                    placeholderTextColor={'white'}
                    placeholder="Team Number"
                    onChangeText={value => props.updateDict('teamNumber', value )}
                />

                <Text
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        alignSelf: 'left',
                        marginBottom: 50,
                        marginLeft: 20,
                        color: 'white',
                    }}>
                    Enter Match Number:
                </Text>

                <TextInput
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginBottom: 10,
                        marginLeft: 60,
                        width: '40%', // Set the width as needed
                        color: 'white',
                    }}
                    placeholderTextColor={'white'}
                    placeholder="Match Number"
                    onChangeText={value => props.updateDict('matchNumber', value)}
                />

                <Text
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        alignSelf: 'left',
                        marginBottom: 50,
                        marginLeft: 20,
                        color: 'white',
                    }}>
                    Enter Driver Station (1-6):
                </Text>

                <CounterInput
                    min={0}
                    max={6}
                    horizontal={true}
                    onChange={counter => {
                        props.updateDict('driveStation', counter);
                    }}
                />

                <TouchableOpacity onPress={() => props.setMatchCreated(true)}>
                    <View
                        style={{
                            backgroundColor: 'lightblue',
                            padding: 15,
                            borderRadius: 5,
                            marginBottom: 20,
                            marginLeft: 250,
                            width: '20%', // Set the width as needed
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                            }}>
                            Create Match
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default NewMatch;

const styles = StyleSheet.create({
    NewMatchView: {
        backgroundColor: 'maroon',
        opacity: 0.3,
        alignItems: 'center',
        padding: 100,
    },
    Text: {
        fontSize: 40,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
        textAlign: 'center',
    },
    TextInput: {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 50,
        fontWeight: '900',
    },
    Dropdown: {},
});