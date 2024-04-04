// TODO
// ONCHANGE API CHANGER

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import NumericInputModal from '../NumericInputModal';

// use later for typescript migration
// interface CounterBoxProps {
//     initial?: string | number;
//     min?: number;
//     max?: number;
//     onChange: (value: number) => void;
// }

const CounterBox = props => {
    const [value, setValue] = useState(parseInt(props.initial || 0, 10));
    const [modalVisible, setModalVisible] = useState(false);

    const decrement = () => {
        setValue(prevValue => {
            const newValue =
                prevValue > (props.min || 0) ? prevValue - 1 : prevValue;
            props.onChange(newValue);
            return newValue;
        });
    };

    const increment = () => {
        setValue(prevValue => {
            const newValue =
                prevValue < (props.max || 10) ? prevValue + 1 : prevValue;
            props.onChange(newValue);
            return newValue;
        });
    };

    const handleSubmit = inputValue => {
        if (
            inputValue !== null &&
            inputValue !== '' &&
            inputValue !== undefined
        ) {
            const newValue = parseInt(inputValue, 10);
            if (!isNaN(newValue)) {
                if (newValue > (props.min || 0) && newValue < (props.max || 10)) {
                    setValue(newValue);
                    props.onChange(newValue);
                } else {
                    if (newValue < (props.min || 0)) {
                        Alert.alert('Value cannot be below the minimum');
                    } else {
                        Alert.alert('Value cannot exceed the maximum');
                    }
                }
            } else {
                Alert.alert('Please enter a number');
            }
        } else {
            Alert.alert('Please enter a valid number');
        }
    };

    return (
        <View style={styles.counterStyling}>
            <View style={styles.counterStyling}>
                <Icon.Button
                    paddingLeft={RFValue(10)}
                    name="x-circle"
                    size={RFValue(25)}
                    color="white"
                    alignSelf="center"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    style={styles.icon}
                    onPress={decrement}
                />
            </View>

            <Button onPress={() => setModalVisible(true)} label={value} />

            <NumericInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
            />

            <View style={styles.counterStyling}>
                <Icon.Button
                    paddingLeft={RFValue(10)}
                    name="plus-circle"
                    size={RFValue(30)}
                    color="white"
                    alignSelf="center"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    style={styles.icon}
                    onPress={increment}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    counterStyling: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        zIndex: 1,
    },
});

export default CounterBox;
