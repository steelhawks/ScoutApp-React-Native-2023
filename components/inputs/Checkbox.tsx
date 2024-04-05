import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CheckboxProps {
    onPress: (selected: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = props => {
    return (
        <SafeAreaView
            style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <BouncyCheckbox
                size={40}
                style={styles.checkbox}
                onPress={selected =>
                    props.onPress(selected)
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    checkbox: {

    }
});

export default Checkbox;
