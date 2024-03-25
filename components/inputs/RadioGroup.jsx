/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native'; // Import View from react-native
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';

const RadioGroup = props => {
    const [checked, setChecked] = useState(null);

    return (
        <SafeAreaView style={{flexDirection: 'row'}}>
            {props.buttons.map(button => (
                <View style={{alignItems: 'center', margin: 15}}>
                    <Text style={styles.text}>{button}</Text>
                    <View key={button} style={styles.view}>
                        <RadioButton
                            theme={{
                                dark: true,
                            }}
                            color="black"
                            value={button}
                            status={
                                checked === button ? 'checked' : 'unchecked'
                            }
                            onPress={() => {
                                if (checked === button) {
                                    setChecked(null);
                                    props.onChange(null);
                                } else {
                                    setChecked(button);
                                    props.onChange(button);
                                }
                            }}
                        />
                    </View>
                </View>
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 15,
        marginBottom: 10,
    },
    view: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: 'rgba(136, 3, 21, 1)',
        borderWidth: 3,
    },
});

export default RadioGroup;
