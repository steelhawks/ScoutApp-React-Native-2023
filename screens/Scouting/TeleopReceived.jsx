import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import CounterBox from '../../components/inputs/CounterBox';
import Checkbox from '../../components/inputs/Checkbox';
import {useDictStore} from '../../contexts/dict.jsx';

const TeleopReceived = () => {
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    const handleTeleopIssuesQueries = (isSelected, id) => {
        const updatedIssues = isSelected
            ? [...dict.telopIssues, id] // add to array if selected
            : dict.telopIssues.filter(issueId => issueId !== id); // remove from array if deselected
        setDict('telopIssues', updatedIssues);
    };

    const tele_received_queries = [
        <Query
            title="Note Received from Human Player"
            item={
                <CounterBox
                    onChange={value =>
                        setDict('telopNotesReceivedFromHumanPlayer', value)
                    }
                />
            }
        />,
        <Query
            title="Note Received from Ground"
            item={
                <CounterBox
                    onChange={value =>
                        setDict('telopNotesReceivedFromGround', value)
                    }
                />
            }
        />,
        <Query
            title="Ferry Notes"
            item={<CounterBox onChange={value => setDict('ferryNotes', value)} />}
        />,
        <Query
            title="Dropped Notes"
            item={
                <CounterBox onChange={value => setDict('droppedNotes', value)} />
            }
        />,
    ];

    const teleop_issues_queries = [
        <Query
            title="Not Moving"
            item={
                <Checkbox
                    onPress={selected =>
                        handleTeleopIssuesQueries(selected, 'NOT_MOVING')
                    }
                />
            }
        />,
        <Query
            title="Lost Connection"
            item={
                <Checkbox
                    onPress={selected =>
                        handleTeleopIssuesQueries(selected, 'LOST_CONNECTION')
                    }
                />
            }
        />,
        <Query
            title="Disabled"
            item={
                <Checkbox
                    onPress={selected =>
                        handleTeleopIssuesQueries(selected, 'DISABLED')
                    }
                />
            }
        />,
    ];

    return (
        <ScrollView>
            <Section
                title={'Teleop Received'}
                queries={tele_received_queries}
                style={styles.sectionStyle}
            />
            <Section
                title={'Teleop Issues'}
                queries={teleop_issues_queries}
                style={styles.sectionStyle}
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

export default TeleopReceived;
