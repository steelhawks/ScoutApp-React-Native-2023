import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from './inputs/Button';

const BackButton = ({destinationScreen = 'Scouting'}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // Use navigation.goBack() to handle the back action
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate(destinationScreen);
        }
    };

    return <Button label="Back" onPress={handlePress} />;
};

export default BackButton;
