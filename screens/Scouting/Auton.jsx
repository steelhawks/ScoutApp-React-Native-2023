import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import RadioGroup from '../../components/inputs/RadioGroup';
import Counter from '../../components/inputs/Counter';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDictStore} from '../../contexts/dict';

const Auton = () => {
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    const auton_queries = [
        <Query
            title="Did the robot leave?"
            item={
                <RadioGroup
                    buttons={['Yes', 'No']}
                    onChange={value => setDict('robotLeft', value)}
                />
            }
        />,
        <Query
            title="Speaker Notes Scored"
            item={
                <Counter
                    onChange={value =>
                        setDict('autonSpeakerNotesScored', value)
                    }
                />
            }
        />,
        <Query
            title="Amp Notes Scored"
            item={
                <Counter
                    onChange={value => setDict('autonAmpNotesScored', value)}
                />
            }
        />,
        <Query
            title="Notes Received"
            item={
                <Counter
                    onChange={value => setDict('autonNotesReceived', value)}
                />
            }
        />,
        <Query
            title="Auton Notes Missed"
            item={<Counter onChange={value => setDict('autonMissed', value)} />}
        />,
    ];

    const handleAutonIssuesQueries = (isSelected, id) => {
        const updatedIssues = isSelected
            ? [...dict.autonIssues, id]  // add to array if selected
            : dict.autonIssues.filter(issueId => issueId !== id);  // remove from array if deselected
    
        setDict('autonIssues', updatedIssues);
    };

    const auton_issues_queries = [
        // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        <Query title="Not Moving" item={<BouncyCheckbox onPress={(selected) => handleAutonIssuesQueries(selected, 'NOT_MOVING')} />} />,
        <Query title="Stopped" item={<BouncyCheckbox onPress={(selected) => handleAutonIssuesQueries(selected, 'STOPPED')} />} />,
        <Query title="Out of Control" item={<BouncyCheckbox onPress={(selected) => handleAutonIssuesQueries(selected, 'OUT_OF_CONTROL')}/>} />,
    ];

    return (
        <ScrollView>
            <Section
                title={'Auton'}
                queries={auton_queries}
                style={[styles.patternSectionStyle]}
            />
            <Section 
                title={'Auton Issues'}
                queries={auton_issues_queries}
                style={[styles.sectionStyle]}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
});

export default Auton;
