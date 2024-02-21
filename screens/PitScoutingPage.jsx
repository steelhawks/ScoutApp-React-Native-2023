import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import fs from 'react-native-fs';
import {UserContext} from '..';
import Button from '../components/inputs/Button';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomTextInput from '../components/inputs/CustomTextInput';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import Counter from '../components/inputs/Counter';
import AvoidKeyboardContainer from '../components/AvoidKeyboardContainer';

const PitScoutingPage = ({setMatchCreated, teamNumber}) => {
    const [isLoading, setIsLoading] = useState(false);

    const backConfirm = () => {
        Alert.alert('You have unsaved changes', 'Continue without saving?', [
            {
                text: 'No',
            },
            {
                text: 'Yes',
                onPress: () => setMatchCreated(false),
                style: 'destructive',
            },
        ]);
    };

    const submitToServer = async () => {
        Alert.alert('Submit Successful.');
    };

    const [dict, setDict] = useState({
        teamNumber: teamNumber,
        dimensions: '',
        weight: '',
        drivetrain: '',
        intake: '',
        vision: '',
        auton: '',
        robotExcel: '',
        trapScorer: '',
    });

    const updateDict = (key, value) => {
        setIsLoading(true);
        setDict({...dict, [key]: value});
    };

    const general_queries = [
        <Query
            title="Dimensions (length x width w/ bumpers"
            item={
                <CustomTextInput
                    label="Dimensions (length x width w/ bumpers)"
                    placeholder="Enter dimensions"
                    onChangeText={text => updateDict('dimensions', text)}
                    value={dict.dimensions}
                    keyboardType={'text'}
                />
            }
        />,
        <Query
            title="Weight (lbs)"
            item={
                <CustomTextInput
                    label="Weight (lbs)"
                    placeholder="Enter weight"
                    onChangeText={text => updateDict('weight', text)}
                    value={dict.weight}
                    keyboardType={'numeric'}
                />
            }
        />,
        <Query
            title="Drivetrain Type"
            item={
                <CustomTextInput
                    label="Drivetrain Type"
                    placeholder="Enter drivetrain type"
                    onChangeText={text => updateDict('drivetrain', text)}
                    value={dict.drivetrain}
                    keyboardType={'text'}
                />
            }
        />,
        <Query
            title="Intake Mechanism"
            item={
                <CustomTextInput
                    label="Intake Mechanism"
                    placeholder="Enter intake mechanism"
                    onChangeText={text => updateDict('intake', text)}
                    value={dict.intake}
                    keyboardType={'text'}
                />
            }
        />,
        <Query
            title="Vision System"
            item={
                <CustomTextInput
                    label="Vision System"
                    placeholder="Enter vision system"
                    onChangeText={text => updateDict('vision', text)}
                    value={dict.vision}
                    keyboardType={'text'}
                />
            }
        />,
    ];

    const auton_queries = [
        <Query
            title="Auton"
            item={
                <CustomTextInput
                    label="Auton Pathing"
                    placeholder="Enter auton"
                    onChangeText={text => updateDict('auton', text)}
                    value={dict.auton}
                    keyboardType={'text'}
                />
            }
        />,
    ];

    const scoring_queries = [
        // <Query
        //     title="Scoring"
        //     item={
        //         <BouncyCheckboxGroup
        //             label="What does your robot excel in?"
        //             data={{
        //                 Amp: 'AMP',
        //                 Speaker: 'SPEAKER',
        //                 Both: 'BOTH',
        //                 Neither: 'NEITHER',
        //             }}
        //             onChange={(checked, id) => {
        //                 updateDict('robotExcel', id);
        //             }}
        //         />
        //     }
        // />,
        <Query
            title="Can your robot score using trap?"
            item={
                <CustomTextInput
                    label="Can your robot score using trap?"
                    placeholder="Type an explanation"
                    onChangeText={text => updateDict('trapScorer', text)}
                    value={dict.trapScorer}
                    keyboardType={'text'}
                />
            }
        />,
    ];

    const form_sections = [
        <Section
            title="General"
            queries={general_queries}
            style={[styles.sectionStyle, styles.patternSectionStyle]}
        />,
        <Section
            title="Auton"
            queries={auton_queries}
            style={[styles.sectionStyle]}
        />,
        <Section
            title="Scoring"
            queries={scoring_queries}
            style={[styles.sectionStyle, styles.patternSectionStyle]}
        />,
    ];

    return (
        <SafeAreaView style={styles.mainView}>
            <AvoidKeyboardContainer>
                <View style={styles.container}>
                    <ScrollView style={{flex: 1}}>
                        <Button onPress={backConfirm} label="Cancel" />
                        <UserContext.Provider value={updateDict}>
                            <Form
                                sections={form_sections}
                                updateDict={updateDict}
                            />
                        </UserContext.Provider>
                        <Button onPress={submitToServer} label="Submit" />
                    </ScrollView>
                </View>
            </AvoidKeyboardContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: RFValue(100),
        color: 'transparent',
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
    },
    container: {
        flex: 1,
    },
    sectionStyle: {
        alignItems: 'center',
        width: '100%',
    },
    patternSectionStyle: {
        backgroundColor: 'rgba(136, 3, 21, 1)',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    checkboxOnlyStyle: {
        alignItems: 'flex-start', // or 'baseline'
        width: '100%',
        size: 30,
        fillColor: 'green',
        unfillColor: '#FFFFFF',
        iconStyle: {borderColor: 'red', alignSelf: 'flex-start'},
        innerIconStyle: {borderWidth: 2},
        padding: 10,
        textStyle: {
            textDecorationLine: 'none',
            fontFamily: 'JosefinSans-Regular',
        },
        iconStyle: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            margin: 10,
        },
    },
});

export default PitScoutingPage;
