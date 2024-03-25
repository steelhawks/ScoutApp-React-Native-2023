/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import CounterBox from '../../components/inputs/CounterBox';
import {useDictStore} from '../../contexts/dict';

const Teleop = () => {
    const setDict = useDictStore(state => state.setDict);

    const tele_scoring_queries = [
        <Query
            title="Speaker Notes Scored"
            item={
                <CounterBox
                    onChange={value =>
                        setDict('telopSpeakerNotesScored', value)
                    }
                />
            }
        />,
        <Query
            title="Amp Notes Scored"
            item={
                <CounterBox
                    onChange={value => setDict('telopAmpNotesScored', value)}
                />
            }
        />,
    ];

    const tele_missed_queries = [
        <Query
            title="Speaker Notes Missed"
            item={
                <CounterBox
                    onChange={value =>
                        setDict('telopSpeakerNotesMissed', value)
                    }
                />
            }
        />,
        <Query
            title="Amp Notes Missed"
            item={
                <CounterBox
                    onChange={value => setDict('telopAmpNotesMissed', value)}
                />
            }
        />,
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
            />
            <Section
                title={'Teleop Missed'}
                queries={tele_missed_queries}
                style={[styles.patternSectionStyle]}
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

export default Teleop;
