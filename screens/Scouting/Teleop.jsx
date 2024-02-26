import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import RadioGroup from '../../components/inputs/RadioGroup';
import Button from '../../components/inputs/Button';
import Counter from '../../components/inputs/Counter';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Teleop = ({dict, updateDict}) => {
    const tele_scoring_queries = [
        <Query
            title="Speaker Notes Scored"
            item={<Counter onChange={value => updateDict('telopSpeakerNotesScored', value)}/>}
        />,
        <Query
            title="Amp Notes Scored"
            item={<Counter onChange={value => updateDict('telopAmpNotesScored', value)}/>}
        />,
        <Query
            title="Amplified Speaker Notes Scored"
            item={<Counter onChange={value => updateDict('telopAmplifiedSpeakerNotes', value)}/>}
        />,
    ];

    const tele_missed_queries = [
        <Query
            title="Speaker Notes Missed"
            item={<Counter onChange={value => updateDict('telopSpeakerNotesMissed', value)}/>}
        />,
        <Query
            title="Amp Notes Missed"
            item={<Counter onChange={value => updateDict('telopAmpNotesMissed', value)}/>}
        />,
    ];

    const tele_received_queries = [
        <Query
            title="Note Received from Human Player"
            item={<Counter onChange={value => updateDict('telopNotesReceivedFromHumanPlayer', value)}/>}
        />,
        <Query
            title="Note Received from Ground"
            item={<Counter onChange={value => updateDict('telopNotesReceivedFromGround', value)}/>}
        />,
    ];

    const teleop_issues_queries = [
        <Query title="Not Moving" item={<BouncyCheckbox />} />,
        <Query title="Lost Connect" item={<BouncyCheckbox />} />,
        <Query title="FMS Issues" item={<BouncyCheckbox />} />,
        <Query title="Disabled" item={<BouncyCheckbox />} />,
    ];
    
    return (
        <ScrollView>
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
        </ScrollView>
    );
}

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

export default Teleop;
