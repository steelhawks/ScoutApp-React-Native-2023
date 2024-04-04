import {View} from 'react-native';
import React from 'react';
import Heading from './Heading';

interface QueryProps {
    title: string;
    item: JSX.Element;
}

const Query: React.FC<QueryProps> = props => {
    return (
        <View style={{alignItems: 'center', padding: 10}}>
            <Heading
                title={props.title}
                sectionHeading={false}
            />
            {props.item}
        </View>
    );
};

export default Query;
