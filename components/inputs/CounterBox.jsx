import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
// import CounterInput from 'react-native-counter-input';
import Button from './Button';
import Icon from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';

const CounterBox = props => {
    // props
    // min for minimum
    // max for maximum
    // inital for inital value

    // TODO
    // make some cool shaking animation happen when max is reached

    const [value, setValue] = useState(0);

    const decrement = () => {
        value !== props.min ? setValue(value - 1) : null;
        props.onChange(value);
    };

    const increment = () => {
        value !== props.max ? setValue(value + 1) : null;
        props.onChange(value);
    };

    // const handleInputValue = () => {
    //     Alert.prompt('Enter Value', inputValue => {
    //         console.log(inputValue);
    //         setValue(inputValue);
    //     });
    // };

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

            <Button onPress={() => null} label={value} />

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
