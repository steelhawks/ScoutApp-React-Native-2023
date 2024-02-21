import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';

const DropdownComponent = ({ data, placeholder, onValueChange, searchable = false }) => {
    const [value, setValue] = useState(null);
    useEffect(() => {
        // Call onValueChange with the current selected value
        if (value !== null) {
            onValueChange(value);
        }
    }, [value, onValueChange]);

    return (
        <Dropdown
            style={styles.dropdown}
            activeColor={'#000000'}
            showsVerticalScrollIndicator={false}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedStyle={styles.selectedStyle}
            data={data}
            search={searchable ? {} : null}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                />
            )}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    itemTextStyle: {
        color: 'white',
        fontSize: 16,
    },
    containerStyle: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
    },
    dropdown: {
        margin: 16,
        height: 50,
        // borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        width: '90%',
        backgroundColor: '#1e1e1e',
        padding: 10,
        borderRadius: 10,
    },
    icon: {
        color: 'white',
        marginRight: 5,
    },
    placeholderStyle: {
        color: 'white',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: 'white',
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        color: 'white',
        borderRadius: 10,
        height: 40,
        fontSize: 16,
    },
});
