import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, Text} from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import RadioGroup from '../components/inputs/RadioGroup';
import Counter from '../components/inputs/Counter';
import fs from 'react-native-fs';
import Button from '../components/inputs/Button';
import {useBackHandler} from '@react-native-community/hooks';
import {RFValue} from 'react-native-responsive-fontsize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {NavigationContainer} from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const ScoutingPageNew = ({
    user,
    navigation,
    eventName,
    setMatchCreated,
    teamNumber,
    matchNumber,
    matchType,
    driveStation,
}) => {
    const [dict, setDict] = useState({
        eventName: eventName,
        scouterName: user.name,
        teamNumber: teamNumber,
        matchNumber: matchNumber,
        matchType: matchType, // qualification, practice, or elimination
        driveStation: driveStation,
        alliance: driveStation < 4 ? 'RED' : 'BLUE', // red or blue
        preloaded: null, // true or false
        robotLeft: null, // true or false
        autonSpeakerNotesScored: 0,
        autonAmpNotesScored: 0,
        autonMissed: 0,
        autonNotesReceived: 0,
        autonIssues: [], // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        telopSpeakerNotesScored: 0,
        telopAmpNotesScored: 0,
        telopAmplifiedSpeakerNotes: 0,
        telopSpeakerNotesMissed: 0,
        telopAmpNotesMissed: 0,
        telopNotesReceivedFromHumanPlayer: 0,
        telopNotesReceivedFromGround: 0,
        endGame: 'EMPTY', // PARKED, ONSTAGE, SPOTLIGHT, Default: EMPTY
        trap: 0,
        fouls: 0,
        techFouls: 0,
        yellowCards: 0,
        redCards: 0,
        telopIssues: [], // NOT_MOVING, LOST_CONNECTION, FMS_ISSUES, DISABLED, Default: EMPTY
        didTeamPlayDefense: null, // YES, NO, Default: null
        // robotType: 'EMPTY', // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
        timeOfCreation: '',
    });

    const updateDict = (key, value) => {
        setIsLoading(true);
        setDict({...dict, [key]: value});
    };

    const Test = () => (
        <ScrollView>
            <Counter/>
        </ScrollView>
    );

    const renderScene = SceneMap({
        test: Test,
    });

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{key: 'test', title: 'Pre-Match'}]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'lightblue'}}
            style={{backgroundColor: 'black'}}
        />
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.mainView}>
                {/*This doesnt work we need to fix this asap*/}
                    <TabView
                        renderTabBar={renderTabBar}
                        navigationState={{index, routes}}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{width: layout.width}}
                        style={styles.tabView}
                    />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Your Title Text</Text>
                </ScrollView>

                {/* This is optional and for a loading screen */}
                {/* <AnimationLoader
                isLoading={isDone}
                loop={false}
                animationKey={'SUCCESS_01'}
                onAnimationComplete={() => setIsDone(false)}
            /> */}
            </SafeAreaView>
        </GestureHandlerRootView>
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
        tabView: {
            flex: 1,
            backgroundColor: '#3498db', // Example color
            borderWidth: 2, // Add a border to help identify the component boundaries
            borderColor: 'red', // Border color for visibility
        },
    },
});

export default ScoutingPageNew;
