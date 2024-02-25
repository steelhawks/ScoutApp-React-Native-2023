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
        // flex: 1,
        padding: 10,
        // paddingLeft: 20,
        textStyle: {
            textDecorationLine: "none",
            fontFamily: 'JosefinSans-Regular',
        },
        iconStyle: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            alignSelf: 'center',
            margin: 10,
        }
    };

    const updateDict = useContext(UserContext);

    return (
        <BouncyCheckboxGroup
            value={props.value}
            style={{
                alignSelf: 'center',
                alignItems: 'center',
            }}
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
