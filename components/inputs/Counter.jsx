import React from 'react';
import CounterInput from 'react-native-counter-input';

const Counter = props => {
    return (
        <CounterInput
            min={0}
            horizontal={true}
            reverseCounterButtons={true}
            onChange={counter => {
                // updateDict(props.id, counter);
                props.onChange(counter);
            }}
        />
    );
};

export default Counter;
