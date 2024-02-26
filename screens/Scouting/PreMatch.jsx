import {StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import RadioGroup from '../../components/inputs/RadioGroup';
import Button from '../../components/inputs/Button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {DictContext} from '../ScoutingPageNEW2';

const Prematch = ({backConfirm}) => {
    const [dict, updateDict] = useContext(DictContext);

    const prematch_queries = [
        <Query
            title="Preloaded?"
            item={
                <RadioGroup
                    value={dict.preloaded}
                    buttons={['Yes', 'No']}
                    onChange={(value) => updateDict('preloaded', value)}
                />
            }
        />,
    ];

    return (
        <ScrollView>
            <Button onPress={backConfirm} label="Cancel" />
            <Section
                title={'Pre-Match'}
                queries={prematch_queries}
                style={styles.sectionStyle}
                updateDict={updateDict}
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

export default Prematch;
