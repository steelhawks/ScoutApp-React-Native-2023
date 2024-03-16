import {View} from 'react-native';
import React from 'react';
import Heading from './Heading';
import {useDictStore} from '../../contexts/dict';

const Query = props => {
    const dict = useDictStore(state => state.dict);
    const setDict = useDictStore(state => state.setDict);

    return (
        <View style={{ alignItems: 'center', padding: 10 }}>
            <Heading title={props.title} sectionHeading={false} style={{ alignItems: 'center' }} />
            {props.item}
        </View>
    );
};

export default Query;
