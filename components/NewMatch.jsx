import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import AnimationLoader from '../AnimationLoader';

const NewMatch = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleStartScouting = async () => {
        setIsLoading(true);

        setTimeout(async () => {
            props.setMatchCreated(true);
            setIsLoading(false);
        }, 1);
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>
                        Hello {props.user.name}! {'\n'}OSIS: {props.user.osis}
                    </Text>

                    {renderInput(
                        'Enter Team Number:',
                        'Team Number',
                        (value) => props.updateDict('teamNumber', value)
                    )}

                    {renderInput(
                        'Enter Match Number:',
                        'Match Number',
                        (value) => props.updateDict('matchNumber', value)
                    )}

                    {renderInput(
                        'Enter Driver Station (1-6):',
                        'Driver Station',
                        (value) => props.updateDict('driveStation', value)
                    )}

                    <TouchableOpacity onPress={handleStartScouting}>
                        <View style={styles.createMatchButton}>
                            <Text style={styles.buttonText}>Create Match</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <AnimationLoader isLoading={isLoading} />
        </>
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
        />
    </>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        padding: 20,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
    },    
    title: {
        fontSize: width < 600 ? 20 : 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: width < 600 ? 16 : 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        color: 'white',
    },
    createMatchButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: width < 600 ? '40%' : '20%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default NewMatch;
