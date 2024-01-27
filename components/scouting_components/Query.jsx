import {View, Text} from 'react-native';
import React from 'react';
import Heading from './Heading';

const Query = props => {
    return (
        <View>
            <Heading title={props.title} sectionHeading={false} />
            {props.item}
        </View>
    );
};

export default Query;
