import { StyleSheet } from 'react-native';
import React from 'react';
import Section from '../../components/scouting_components/Section';
import Query from '../../components/scouting_components/Query';
import RadioGroup from '../../components/inputs/RadioGroup';
import Button from '../../components/inputs/Button';
import { useDictStore } from '../../contexts/dict';

const Prematch = ({backConfirm}) => {
    const setDict = useDictStore(state => state.setDict);

    const prematch_queries = [
        <Query
            title="Preloaded?"
            item={
                <RadioGroup
                    buttons={['Yes', 'No']}
                    onChange={(selectedItem) => {
                        setDict('preloaded', selectedItem);
                    }}
                />
            }
        />,
    ];

    return (
        <>
            <Button onPress={backConfirm} label="Cancel" />
            <Section
                title={'Pre-Match'}
                queries={prematch_queries}
                style={styles.sectionStyle}
            />
        </>
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
