import React, {useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import CounterInput from 'react-native-counter-input';

const NewMatch = props => {
    return (
        <View style={styles.background}>
            <ScrollView>
                <Text style={styles.title}>
                    Hello {props.user.name}! {'\n'}OSIS: {props.user.osis}
                </Text>

                {renderInput('Enter Team Number:', 'Team Number', value =>
                    props.updateDict('teamNumber', value),
                )}

                {renderInput('Enter Match Number:', 'Match Number', value =>
                    props.updateDict('matchNumber', value),
                )}

                {renderInput(
                    'Enter Driver Station (1-6):',
                    'Driver Station',
                    value => props.updateDict('driveStation', value),
                )}

                <TouchableOpacity onPress={() => props.setMatchCreated(true)}>
                    <View style={styles.createMatchButton}>
                        <Text style={styles.buttonText}>Create Match</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const renderInput = (label, placeholder, onChange) => (
    <>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder={placeholder}
            onChangeText={onChange}
            alignSelf={'center'}
        />
    </>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#282c34',
        // opacity: 0.3,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
        color: 'white',
        alignSelf: 'center',
    },
    inputLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        color: 'white',
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        marginLeft: 20,
        width: '80%',
        color: 'white',
    },
    createMatchButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        marginLeft: '40%',
        width: '20%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default NewMatch;
