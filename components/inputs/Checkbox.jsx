import React, {useState} from 'react';
import {Text, Image, Pressable, StyleSheet} from 'react-native';

const Checkbox = props => {
    const [checked, setChecked] = useState(false);

    return (
        <>
            <Pressable
                onPress={() => {
                    setChecked(checked => !checked);
                }}
                style={[
                    {backgroundColor: checked ? '#c4ffff' : 'white'},
                    styles.Checkbox,
                ]}>
                <Image
                    source={checked && require('../../assets/check.png')}
                    style={styles.CheckImage}
                />
                <Text
                    style={[
                        {backgroundColor: checked ? '#c4ffff' : 'white'},
                        styles.Label,
                    ]}>
                    {props.label}
                </Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    Checkbox: {
        border: 'black',
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: 'row',
        height: 40,
        width: 40,
        alignItems: 'center',
    },
    CheckImage: {
        height: 30,
        width: 30,
        marginRight: 30,
    },
    Label: {
        border: 'black',
        color: 'black',
        fontWeight: 4,
        borderWidth: 3,
        borderRadius: 10,
        fontSize: 20,
        width: 300,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default Checkbox;
