import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

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
            onAnimationComplete && onAnimationComplete(); // Check if onAnimationComplete is defined before calling it
        }, duration);
    };

    return (
        isLoading ? (
            <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                <AnimatedLottieView
                    source={animationSource}
                    autoPlay
                    loop={loop}
                    style={{ width: 200, height: 200 }}
                    onAnimationFinish={() => setOn(0, onAnimationComplete)} // Use setOn to delay the callback
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
        backgroundColor: 'rgba(0, 0, 0, .0)',
        zIndex: 1,
    },
});

export default AnimationLoader;
