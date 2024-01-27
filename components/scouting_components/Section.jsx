import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Heading from './Heading';

const Section = props => {
    return (
        <View>
            <Heading title={props.title} sectionHeading={true} />
            {props.queries}
        </View>
    );
};

export default Section;