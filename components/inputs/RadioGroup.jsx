import React from 'react';
import {useContext} from 'react';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import { UserContext } from '../..';

const RadioGroup = props => {
    const styles = {
        size: 30,
        fillColor: 'green',
        unfillColor: '#FFFFFF',
        iconStyle: {borderColor: 'red'},
        innerIconStyle: {borderWidth: 2},
        flex: 1,
        padding: 10,
        textStyle: {
            fontFamily: 'JosefinSans-Regular',
        },
    };

    const updateDict = useContext(UserContext);

    return (
        <BouncyCheckboxGroup
            data={props.buttons.map(button => {
                return {
                    id: button,
                    text: button,
                    ...styles,
                };
            })}
            onChange={selectedItem =>
                updateDict(props.id, selectedItem['text'])
            }
        />
    );
};

export default RadioGroup;
