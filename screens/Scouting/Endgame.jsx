import {StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import RadioGroup from '../../components/inputs/RadioGroup';
import Button from '../../components/inputs/Button';
import Counter from '../../components/inputs/Counter';
import {useDictStore} from '../../contexts/dict';
import {SafeAreaView} from 'react-native';

const Endgame = ({endMatch}) => {
    // const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);
    // const [requiredQueriesCompleted, setRequiredQueriesCompleted] = useState(false);

    // // Define the required queries for Auton
    // const requiredQueries = ['didTeamPlayDefense'];

    // // Validation function to check if all required queries are completed
    // const validateQueries = () => {
    //     // Check if all required queries have values
    //     const allQueriesCompleted = requiredQueries.every(query => {
    //         return dict[query] !== null && dict[query] !== '';
    //     });
    //     setRequiredQueriesCompleted(allQueriesCompleted);
    // };

    // useEffect(() => {
    //     validateQueries();
    // }, [dict]);

    const penalties_queries = [
        <Query
            title="Fouls"
            item={<Counter onChange={value => setDict('fouls', value)} />}
        />,
        <Query
            title="Tech Fouls"
            item={<Counter onChange={value => setDict('techFouls', value)} />}
        />,
        <Query
            title="Yellow Cards"
            item={<Counter onChange={value => setDict('yellowCards', value)} />}
        />,
        <Query
            title="Red Cards"
            item={<Counter onChange={value => setDict('redCards', value)} />}
        />,
    ];

    const defense_queries = [
        <Query
            title="Defense"
            item={
                <RadioGroup
                    buttons={['Yes', 'No']}
                    onChange={value => setDict('didTeamPlayDefense', value)}
                />
            }
        />,
    ];

    const endgame_queries = [
        <SafeAreaView>
            <Query
                title="Position"
                item={
                    <RadioGroup
                        buttons={['Parked', 'Onstage', 'Spotlight', 'N/A']}
                        onChange={value => setDict('endGame', value)}
                    />
                }
            />
            <Query
                title="Trap"
                item={<Counter onChange={value => setDict('trap', value)} />}
            />
        </SafeAreaView>,
    ];

    return (
        <ScrollView>
            <Section
                title={'Endgame'}
                queries={endgame_queries}
                style={[styles.sectionStyle, styles.patternSectionStyle]}
            />
            <Section
                title={'Defense'}
                queries={defense_queries}
                style={styles.sectionStyle}
            />
            <Section
                title={'Penalties'}
                queries={penalties_queries}
                style={[styles.sectionStyle, styles.patternSectionStyle]}
            />
            <Button onPress={endMatch} label="End Match" />
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

export default Endgame;
