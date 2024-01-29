import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimationLoader from '../AnimationLoader';

const ExtraInfoPage = () => {
    return (
        <>
            <View>
                <Text>ExtraInfoPage</Text>
            </View>
            <AnimationLoader isLoading={isLoading} />
        </>
    );
};

export default ExtraInfoPage;

const styles = StyleSheet.create({});
