import { View, Text } from 'react-native';
import React from 'react';
import Heading from './Heading';

const Query = props => {
    return (
        <View style={{ alignItems: 'center', padding: 10 }}>
            <Heading title={props.title} sectionHeading={false} style={{ alignItems: 'center' }} />
            {props.item}
        </View>
    );
};

export default Query;
