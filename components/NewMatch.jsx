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
import {RFValue} from 'react-native-responsive-fontsize';
import AvoidKeyboardContainer from './AvoidKeyboardContainer';
import {SafeAreaView} from 'react-native-safe-area-context';

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
        return (
            teamNumberLocal !== '' &&
            matchNumberLocal !== '' &&
            driveStationLocal !== 0
        );
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
            <SafeAreaView style={styles.avoidTabBar}>
                <AvoidKeyboardContainer>
                    <View style={styles.avoidTabBar}>
                        <View style={styles.container}>
                            <ScrollView
                                contentContainerStyle={styles.scrollView}
                                showsVerticalScrollIndicator={false}>
                                <Text style={styles.title}>
                                    {/* Hello {props.user.name}! */}
                                    New Match
                                </Text>

                                <CustomTextInput
                                    label={'Enter Team Number:'}
                                    placeholder={'Team Number'}
                                    onChangeText={value =>
                                        setTeamNumberLocal(value)
                                    }
                                    value={teamNumberLocal}
                                />
                                <CustomTextInput
                                    label={'Enter Match Number:'}
                                    placeholder={'Match Number'}
                                    onChangeText={value =>
                                        setMatchNumberLocal(value)
                                    }
                                    value={matchNumberLocal}
                                />
                                <Text style={{...styles.title,
                                    marginTop: 0,
                                    paddingTop: RFValue(10),
                                    fontSize: RFValue(15)
                                }}>
                                    Select Drive Station
                                </Text>
                                <DriveStationUI
                                    updateDict={(key, value) =>
                                        setDriveStationLocal(value)
                                    }
                                />

                                <Button
                                    label={'Create Match'}
                                    onPress={handleStartScouting}
                                />
                            </ScrollView>
                        </View>
                        <AnimationLoader isLoading={isLoading} />
                    </View>
                </AvoidKeyboardContainer>
            </SafeAreaView>
        </>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    avoidTabBar: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: RFValue(10),
        paddingBottom: RFValue(40),
    },
    container: {
        backgroundColor: '#121212',
        padding: 20,
        color: 'transparent',
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
    },
    titleScreen: {
        position: 'absolute',
        // paddingBottom: 500,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    title: {
        paddingTop: RFValue(50),
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: 'white', // White text color for dark mode
        marginBottom: RFValue(20),
        textAlign: 'center',
    },
    createMatchButton: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: RFValue(20),
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default NewMatch;
