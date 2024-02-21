import {View, Text} from 'react-native';
import {React, useContext} from 'react';
import Heading from './Heading';
import {UserContext} from '../..';

const Query = props => {
    const updateDict = useContext(UserContext);

    return (
        <View style={{alignItems: 'center', padding: 10}}>
            <Heading title={props.title} sectionHeading={false} style={{allignItems: 'center'}} />
            {props.item}
        </View>
    );
};

export default Query;
