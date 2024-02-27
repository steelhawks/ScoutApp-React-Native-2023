import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Form from '../components/scouting_components/Form';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimationLoader from '../AnimationLoader';
import Section from '../components/scouting_components/Section';
import Query from '../components/scouting_components/Query';
import RadioGroup from '../components/inputs/RadioGroup';
import Counter from '../components/inputs/Counter';
import fs from 'react-native-fs';
import {UserContext} from '..';
import Button from '../components/inputs/Button';
import {useBackHandler} from '@react-native-community/hooks';
import {RFValue} from 'react-native-responsive-fontsize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {NavigationContainer} from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

const ScoutingPage = ({
    user,
    navigation,
    eventName,
    setMatchCreated,
    teamNumber,
    matchNumber,
    matchType,
    driveStation,
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [readyToPlaySuccessAnimation, setReadyToPlaySuccessAnimation] =
        useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
            date +
                '/' +
                month +
                '/' +
                year +
                ' ' +
                hours +
                ':' +
                min +
                ':' +
                sec,
        );
    }, []);

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

    const endMatch = () => {
        setReadyToPlaySuccessAnimation(true);
        setIsLoading(true);
        setIsDone(true);

        setDict(prevDict => {
            return {
                ...prevDict,
                timeOfCreation: currentDate,
            };
        });
    };

    useEffect(() => {
        if (isDone) {
            saveToJson(dict);
            setIsLoading(false);
            setIsDone(false);
        }
    }, [isDone, dict]);

    const saveToJson = async data => {
        try {
            const docDir = fs.DocumentDirectoryPath;
            const filePath = `${docDir}/${user.name.replace(/\s/g, '')}-${
                dict.teamNumber
            }-${dict.matchNumber}.json`;

            const jsonData = JSON.stringify(data, null, 4);

            await fs.writeFile(filePath, jsonData, 'utf8');

            Alert.alert('Match ' + dict.matchNumber + ' Saved!', '', [
                {text: 'New Match', onPress: () => setMatchCreated(false)},
                {
                    text: 'View Match',
                    onPress: () => {
                        setMatchCreated(false);
                        navigation.navigate('Data');
                    },
                },
                {text: 'OK', onPress: () => setMatchCreated(false)},
            ]);
        } catch (error) {
            console.error('Error saving data to file:', error.message);
        }
    };

    const prematch_queries = [
        <Query
            title="Preloaded?"
            item={<RadioGroup buttons={['Yes', 'No']} id="preloaded" />}
        />,
    ];

    const auton_queries = [
        <Query
            title="Did the robot leave?"
            item={<RadioGroup buttons={['Yes', 'No']} id="robotLeft" />}
        />,
        <Query
            title="Speaker Notes Scored"
            item={<Counter id="autonSpeakerNotesScored" />}
        />,
        <Query
            title="Amp Notes Scored"
            item={<Counter id="autonAmpNotesScored" />}
        />,
        <Query
            title="Notes Received"
            item={<Counter id="autonNotesReceived" />}
        />,
        <Query
            title="Auton Notes Missed"
            item={<Counter id="autonMissed" />}
        />,
        <Query
            title="Auton Issues"
            item={<RadioGroup buttons={['Yes', 'No']} id="autonIssues" />}
        />,
    ];

    const auton_issues_queries = [
        // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        <Query title="Not Moving" item={<BouncyCheckbox />} />,
        <Query title="Stopped" item={<BouncyCheckbox />} />,
        <Query title="Out of Control" item={<BouncyCheckbox />} />,
    ];

    const tele_scoring_queries = [
        <Query
            title="Speaker Notes Scored"
            item={<Counter id="telopSpeakerNotesScored" />}
        />,
        <Query
            title="Amp Notes Scored"
            item={<Counter id="telopAmpNotesScored" />}
        />,
        <Query
            title="Amplified Speaker Notes Scored"
            item={<Counter id="telopAmplifiedSpeakerNotes" />}
        />,
    ];

    const tele_missed_queries = [
        <Query
            title="Speaker Notes Missed"
            item={<Counter id="telopSpeakerNotesMissed" />}
        />,
        <Query
            title="Amp Notes Missed"
            item={<Counter id="telopAmpNotesMissed" />}
        />,
    ];

    const tele_received_queries = [
        <Query
            title="Note Received from Human Player"
            item={<Counter id="telopNotesReceivedFromHumanPlayer" />}
        />,
        <Query
            title="Note Received from Ground"
            item={<Counter id="telopNotesReceivedFromGround" />}
        />,
    ];

    const penalties_queries = [
        <Query title="Fouls" item={<Counter id="fouls" />} />,
        <Query title="Tech Fouls" item={<Counter id="techFouls" />} />,
        <Query title="Yellow Cards" item={<Counter id="yellowCards" />} />,
        <Query title="Red Cards" item={<Counter id="redCards" />} />,
    ];

    const handleTeleopIssuesQueries = (isSelected, id) => {
        const updatedIssues = isSelected
            ? [...dict.telopIssues, id]  // add to array if selected
            : dict.telopIssues.filter(issueId => issueId !== id);  // remove from array if deselected
    
        updateDict('telopIssues', updatedIssues);
    };
       

    const teleop_issues_queries = [
        <Query title="Not Moving" item={<BouncyCheckbox onPress={(selected) => handleTeleopIssuesQueries(selected, 'NOT_MOVING')}/>} />,
        <Query title="Lost Connect" item={<BouncyCheckbox onPress={(selected) => handleTeleopIssuesQueries(selected, 'LOST_CONNECTION')}/>} />,,
        <Query title="FMS Issues" item={<BouncyCheckbox onPress={(selected) => handleTeleopIssuesQueries(selected, 'FMS_ISSUES')}/>} />,,,
        <Query title="Disabled" item={<BouncyCheckbox onPress={(selected) => handleTeleopIssuesQueries(selected, 'DISABLED')} />} />,
    ];

    const defense_queries = [
        <Query
            title="Defense"
            item={
                <RadioGroup buttons={['Yes', 'No']} id="didTeamPlayDefense" />
            }
        />,
    ];

    const endgame_queries = [
        <Query
            title="Position"
            item={
                <RadioGroup
                    buttons={['Parked', 'Onstage', 'Spotlight']}
                    id="endGame"
                />
            }
        />,
        <Query title="Trap" item={<Counter id="trap" />} />,
    ];

    const form_sections = [
        <Section
            title={'Pre-Match'}
            queries={prematch_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Auton'}
            queries={auton_queries}
            style={[styles.patternSectionStyle]}
        />,
        <Section
            title={'Teleop Scoring'}
            queries={tele_scoring_queries}
            style={[
                styles.sectionStyle,
                {backgroundColor: 'lightblue'},
                {borderRadius: 20},
                {marginBottom: 10},
                {marginTop: 10},
            ]}
        />,
        <Section
            title={'Teleop Missed'}
            queries={tele_missed_queries}
            style={[styles.patternSectionStyle]}
        />,
        <Section
            title={'Teleop Received'}
            queries={tele_received_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Endgame'}
            queries={endgame_queries}
            style={[styles.sectionStyle, styles.patternSectionStyle]}
        />,
        <Section
            title={'Defense'}
            queries={defense_queries}
            style={styles.sectionStyle}
        />,
        <Section
            title={'Penalties'}
            queries={penalties_queries}
            style={[styles.sectionStyle, styles.patternSectionStyle]}
        />,
        <Section
            title={'Teleop Issues'}
            queries={teleop_issues_queries}
            style={styles.sectionStyle}
        />,
    ];

    useBackHandler(() => {
        setMatchCreated(false);
        return true;
    });

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

    const Prematch = () => (
        <UserContext.Provider value={updateDict}>
            <ScrollView>
                <Button onPress={backConfirm} label="Cancel" />
                <Section
                    title={'Pre-Match'}
                    queries={prematch_queries}
                    style={styles.sectionStyle}
                    updateDict={updateDict}
                />
            </ScrollView>
        </UserContext.Provider>
    );

    const Auton = () => (
        <UserContext.Provider value={updateDict}>
            <ScrollView>
                <Section
                    title={'Auton'}
                    queries={auton_queries}
                    style={[styles.patternSectionStyle]}
                    updateDict={updateDict}
                />
            </ScrollView>
        </UserContext.Provider>
    );

    const Teleop = () => (
        <ScrollView>
            <UserContext.Provider value={updateDict}>
                <Section
                    title={'Teleop Scoring'}
                    queries={tele_scoring_queries}
                    style={[
                        styles.sectionStyle,
                        {backgroundColor: 'lightblue'},
                        {borderRadius: 20},
                        {marginBottom: 10},
                        {marginTop: 10},
                    ]}
                    updateDict={updateDict}
                />
                <Section
                    title={'Teleop Missed'}
                    queries={tele_missed_queries}
                    style={[styles.patternSectionStyle]}
                    updateDict={updateDict}
                />
                <Section
                    title={'Teleop Received'}
                    queries={tele_received_queries}
                    style={styles.sectionStyle}
                    updateDict={updateDict}
                />
                <Section
                    title={'Teleop Issues'}
                    queries={teleop_issues_queries}
                    style={styles.sectionStyle}
                    updateDict={updateDict}
                />
            </UserContext.Provider>
        </ScrollView>
    );

    const Endgame = () => (
        <ScrollView>
            <Section
                title={'Endgame'}
                queries={endgame_queries}
                style={[styles.sectionStyle, styles.patternSectionStyle]}
                updateDict={updateDict}
            />
            <Section
                title={'Defense'}
                queries={defense_queries}
                style={styles.sectionStyle}
                updateDict={updateDict}
            />
            <Section
                title={'Penalties'}
                queries={penalties_queries}
                style={[styles.sectionStyle, styles.patternSectionStyle]}
                updateDict={updateDict}
            />

            <Button onPress={() => endMatch()} label="End Match" />
        </ScrollView>
    );

    const renderScene = SceneMap({
        prematch: Prematch,
        auton: Auton,
        teleop: Teleop,
        endgame: Endgame,
    });

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'prematch', title: 'Pre-Match'},
        {key: 'auton', title: 'Auton'},
        {key: 'teleop', title: 'Teleop'},
        {key: 'endgame', title: 'Endgame'},
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'lightblue'}}
            style={{backgroundColor: 'black'}}
        />
    );

    return (
        <SafeAreaView style={styles.mainView}>
            {/*This doesnt work we need to fix this asap*/}
            {/* <UserContext.Provider value={updateDict}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                    style={styles.tabView}
                />
            </UserContext.Provider> */}
            {/*This works (OLD) */}
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <Button onPress={backConfirm} label="Cancel" />
                    <UserContext.Provider value={updateDict}>
                        <Form
                            sections={form_sections}
                            updateDict={updateDict}
                        />
                    </UserContext.Provider>
                    <Button onPress={() => endMatch()} label="End Match" />
                </ScrollView>
            </View>
            <AnimationLoader
                isLoading={readyToPlaySuccessAnimation}
                loop={false}
                animationKey={'SUCCESS_01'}
                onAnimationComplete={() =>
                    setReadyToPlaySuccessAnimation(false)
                }
            />
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
        tabView: {
            flex: 1,
            backgroundColor: '#3498db', // Example color
            borderWidth: 2, // Add a border to help identify the component boundaries
            borderColor: 'red', // Border color for visibility
        },
    },
});

export default ScoutingPage;
