import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Heading from './Heading';
import { useDictStore } from '../../contexts/dict';

const Section = props => {
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    return (
        <View style={props.style}>
            <Heading title={props.title} sectionHeading={true} />
            {props.queries}
        </View>
    );
};

export default Section;
