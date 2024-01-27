import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Form = props => {
    return <View>
        {
            props.sections
        }
    </View>;
};

export default Form;

const styles = StyleSheet.create({});
