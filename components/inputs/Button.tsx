import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, ViewStyle} from 'react-native';

interface ButtonProps {
    label: string;
    onPress: () => void;
    style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = props => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: 'rgba(136, 3, 21, 1)',
            padding: 15,
            borderRadius: 5,
            marginHorizontal: '10%',
        },
        buttonText: {
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
            fontWeight: 'bold',
        },
    });

    const buttonStyle: ViewStyle = {
        margin: '5%',
    };

    return (
        <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
            <View style={[styles.button, props.style]}>
                <Text style={styles.buttonText}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
