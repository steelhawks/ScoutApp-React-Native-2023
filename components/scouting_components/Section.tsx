import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Heading from './Heading';

interface SectionProps {
    title: string;
    queries: JSX.Element;
    style: any;
}

const Section: React.FC<SectionProps> = props => {
    return (
        <View style={props.style}>
            <Heading title={props.title} sectionHeading={true} />
            {props.queries}
        </View>
    );
};

export default Section;
