import React from 'react';
import {View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

// ENUM WITH ALL THE ANIMATION FILES
const animationSources = {
    LOAD_01: require('./assets/anim_load_01.json'),
    LOAD_02: require('./assets/anim_load_02.json'),
    SUCCESS_01: require('./assets/anim_success.json')
    // Add more animation sources as needed
};

const AnimationLoader = ({ isLoading = false, loop = true, animationKey = 'LOAD_02', onAnimationComplete }) => {
    const animationSource = animationSources[animationKey];

    const setOn = (duration, callback) => {
        setTimeout(() => {
            callback();
            onAnimationComplete(); // Call the callback provided by the parent component
        }, duration);
    };

    return (
        isLoading ? (
            <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                <LottieView
                    source={animationSource}
                    autoPlay
                    loop={loop}
                    style={{ width: 200, height: 200 }}
                    onAnimationFinish={() => onAnimationComplete()} // Call the callback when animation finishes
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

export default AnimationLoader;
