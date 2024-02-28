import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {TextInput, Text, StyleSheet} from 'react-native';

const CustomTextInput = props => {
    const styles = StyleSheet.create({
        inputLabel: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 10,
            color: 'white',
            paddingBottom: 5,
        },
        input: {
            padding: RFValue(10),
            borderRadius: RFValue(5),
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: RFValue(10),
            color: 'white',
        },
    });

    return (
        <>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={'white'}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                alignSelf={'center'}
                keyboardType={props.keyboardType}
                autoCorrect={false}
            />
        </>
    );
};

export default CustomTextInput;
