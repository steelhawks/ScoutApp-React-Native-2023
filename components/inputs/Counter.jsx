import React, {useState} from 'react';
import CounterInput from 'react-native-counter-input';
import {useContext} from 'react';
import { UserContext } from '../..';

import {
    StyleSheet,
} from 'react-native';

const Counter = props => {
    const updateDict = useContext(UserContext);

    return (
        <CounterInput
            min={0}
            horizontal={true}
            reverseCounterButtons={true}
            onChange={counter => {
                updateDict(props.id, counter);
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default Counter;
