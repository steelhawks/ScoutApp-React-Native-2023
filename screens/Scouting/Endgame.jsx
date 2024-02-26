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

const Endgame = ({dict, updateDict, endMatch}) => {
    const penalties_queries = [
        <Query title="Fouls" item={<Counter onChange={value => updateDict('fouls', value)} />} />,
        <Query title="Tech Fouls" item={<Counter onChange={value => updateDict('techFouls', value)} />} />,
        <Query title="Yellow Cards" item={<Counter onChange={value => updateDict('yellowCards', value)} />} />,
        <Query title="Red Cards" item={<Counter onChange={value => updateDict('redCards', value)} />} />,
    ];

    const defense_queries = [
        <Query
            title="Defense"
            item={
                <RadioGroup buttons={['Yes', 'No']} onChange={value => updateDict('didTeamPlayDefense', value)} />
            }
        />,
    ];

    const endgame_queries = [
        <Query
            title="Position"
            item={
                <RadioGroup
                    buttons={['Parked', 'Onstage', 'Spotlight']}
                    onChange={value => updateDict('endGame', value)}
                />
            }
        />,
        <Query title="Trap" item={<Counter onChange={value => updateDict('trap', value)} />} />,
    ];
    
    return (
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

export default Endgame;
