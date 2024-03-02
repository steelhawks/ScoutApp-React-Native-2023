import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const RadioGroup = props => {
    const styles = {
        size: 30,
        fillColor: 'green',
        unfillColor: '#FFFFFF',
        iconStyle: {borderColor: 'red'},
        innerIconStyle: {borderWidth: 2},
        padding: 10,
        textStyle: {
            textDecorationLine: 'none',
            fontFamily: 'JosefinSans-Regular',
        },
        iconStyle: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            alignSelf: 'center',
            // margin: 10,
        },
    };

    return (
        <SafeAreaView>
            <BouncyCheckboxGroup
                style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                checkboxProps={{}}
                data={props.buttons.map(button => {
                    return {
                        id: button,
                        text: button,
                        ...styles,
                    };
                })}
                onChange={selectedItem => props.onChange(selectedItem['text'])}
            />
        </SafeAreaView>
    );
};

export default RadioGroup;
