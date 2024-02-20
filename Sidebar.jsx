import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Sidebar = ({sections, navigateToSection}) => {
    return (
        <View style={styles.sidebar}>
            {sections.map((section, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigateToSection(index)}
                    style={styles.sidebarButton}>
                    <Text>Section {index + 1}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 1, // Ensures the sidebar is on top
    },
    sidebarButton: {
        marginVertical: 10,
    },
});

export default Sidebar;
