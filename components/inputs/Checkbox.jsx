import {Text, Image, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Checkbox = props => {
    const [checked, setChecked] = useState(false);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View
                style={{
                    height: 30,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: checkboxState ? '#34eb83' : '#eb4034',
                }}>
                <Text
                    style={{
                        color: '#fff',
                    }}>{`Check Status: ${checkboxState.toString()}`}</Text>
            </View>
            <BouncyCheckbox
                style={{marginTop: 16}}
                ref={(ref) => (bouncyCheckboxRef = ref)}
                isChecked={checkboxState}
                text="Synthetic Checkbox"
                disableBuiltInState
                onPress={() => setCheckboxState(!checkboxState)}
            />
            <RNBounceable
                style={{
                    marginTop: 16,
                    height: 50,
                    width: '90%',
                    backgroundColor: '#ffc484',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => bouncyCheckboxRef?.onPress()}>
                <Text style={{color: '#fff'}}>Synthetic Checkbox Press</Text>
            </RNBounceable>
        </SafeAreaView>
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
