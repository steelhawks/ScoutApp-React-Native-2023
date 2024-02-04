import React from 'react';
import {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const Button = props => {
    const styles = StyleSheet.create({
        buttonStyle: {
            backgroundColor: '#455a64',
            padding: 10,
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 1,
            marginBottom: 20,
            width: '100%',
            color: 'white',
            alignSelf: 'center'
        },
        buttonText: {
            color: 'white',
            fontFamily: 'JosefinSans-Regular',
            fontSize: 30,
            alignSelf: 'center'
        },
    });

    return (
        <TouchableOpacity onPress={props.onPress} style={{margin: '5%'}} >
            <View style={styles.buttonStyle}>
                <Text style={styles.buttonText}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
