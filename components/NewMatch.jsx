import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimationLoader from '../AnimationLoader';
import CustomTextInput from './inputs/CustomTextInput';
import Button from './inputs/Button';
import DriveStationUI from './inputs/DriveStationUI';

const NewMatch = props => {
    const [isLoading, setIsLoading] = useState(false);

    const [teamNumberLocal, setTeamNumberLocal] = useState(0);
    const [matchNumberLocal, setMatchNumberLocal] = useState(0);
    const [driveStationLocal, setDriveStationLocal] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
            // Prevent default behavior when the back button is pressed
            e.preventDefault();

            // Save the state or any other necessary actions
            // You can use AsyncStorage or other state management solutions for long-term storage

            // Continue with the navigation
            navigation.dispatch(e.data.action);
        });

        return unsubscribe;
    }, [navigation]);

    const checkFilledOut = () => {
        return teamNumberLocal !== '' && matchNumberLocal !== '' && driveStationLocal !== 0;
    };

    const handleStartScouting = async () => {
        if (checkFilledOut()) {
            setIsLoading(true);
            setTimeout(async () => {
                props.setTeamNumber(teamNumberLocal);
                props.setMatchNumber(matchNumberLocal);
                props.setDriveStation(driveStationLocal);

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
                <Text style={styles.title}>New Match</Text>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>
                        Hello {props.user.name}! {'\n'}OSIS: {props.user.osis}{' '}
                        {'\n'}Event: {props.eventName}
                    </Text>

                    <CustomTextInput
                        label={'Enter Team Number:'}
                        placeholder={'Team Number'}
                        onChangeText={value => setTeamNumberLocal(value)}
                        value={teamNumberLocal}
                    />
                    <CustomTextInput
                        label={'Enter Match Number:'}
                        placeholder={'Match Number'}
                        onChangeText={value => setMatchNumberLocal(value)}
                        value={matchNumberLocal}
                    />
                    <Text style={styles.title}>Select Drive Station</Text>
                    <DriveStationUI
                        updateDict={(key, value) => setDriveStationLocal(value)}
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
    titleScreen: {
        position: 'absolute',
        paddingBottom: 500,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
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
