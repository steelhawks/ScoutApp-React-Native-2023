import React from 'react';
import {View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const AppLoader = (props) => {
    return (
        props.isLoading ? (
            <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                <LottieView
                    source={require('./assets/anim_load_02.json')}
                    autoPlay
                    loop
                    style={{width: 200, height: 200}} // THIS IS NEEDED FOR IT TO FUNCTION
                />
            </View>
        ) : (
            null
        )
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        zIndex: 1,
    },
});

export default AppLoader;
