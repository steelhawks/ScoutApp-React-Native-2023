import React, {useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import AnimationLoader from '../AnimationLoader';
import CustomTextInput from './inputs/CustomTextInput';
import Button from './inputs/Button';

const NewMatch = props => {
    const [isLoading, setIsLoading] = useState(false);

    const checkFilledOut = () => {
        return (
            props.dict['teamNumber'] !== 0 &&
            props.dict['matchNumber'] !== 0 &&
            props.dict['driveStation'] !== 0
        );
    };

    const handleStartScouting = async () => {
        if (true) {
            setIsLoading(true);
            setTimeout(async () => {
                props.setMatchCreated(true);
                setIsLoading(false);
            }, 1);
        } else {
            Alert.alert('Please fill out all fields');
        }
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>
                        Hello {props.user.name}! {'\n'}OSIS: {props.user.osis}{' '}
                        {'\n'}Event: {props.eventName}
                    </Text>

                    <CustomTextInput
                        label={'Enter Team Number:'}
                        placeholder={'Team Number'}
                        onChangeText={value =>
                            props.updateDict('teamNumber', value)
                        }
                    />
                    <CustomTextInput
                        label={'Enter Match Number:'}
                        placeholder={'Match Number'}
                        onChangeText={value =>
                            props.updateDict('matchNumber', value)
                        }
                    />

                
                    <CustomTextInput
                        label={'Enter Driver Station (1-6):'}
                        placeholder={'Driver Station'}
                        onChangeText={value =>
                            props.updateDict('driveStation', value)
                        }
                    />

                    <Button
                        label={'Create Match'}
                        onPress={handleStartScouting}
                    />
                </ScrollView>
            </View>
            <AnimationLoader isLoading={isLoading} />
        </>
    );
};

const {width} = Dimensions.get('window');

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
