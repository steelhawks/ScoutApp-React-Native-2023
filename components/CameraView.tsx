import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import Button from '../components/inputs/Button';
import fs from 'react-native-fs';
import {useState} from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimationLoader from '../AnimationLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

const docDir = fs.DocumentDirectoryPath;

export const CameraView = ({navigation}: any) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} label="Grant Permission?" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const saveOfflineData = async (json: any) => {
        console.log(json);
        const data = JSON.parse(json);

        const docDir = fs.DocumentDirectoryPath;

        if (data.matchNumber === 'PIT') {
            const filePath = `${docDir}/PIT-SCOUTING-${data.scouterName.replace(
                /\s/g,
                '',
            )}-${data.teamNumber}.json`;

            const jsonData = JSON.stringify(data, null, 4);
            await fs.writeFile(filePath, jsonData, 'utf8');
        } else {
            const filePath = `${docDir}/${data.scouterName.replace(
                /\s/g,
                '',
            )}-${data.teamNumber}-${data.matchNumber}.json`;

            const jsonData = JSON.stringify(data, null, 4);
            await fs.writeFile(filePath, jsonData, 'utf8');
        }
        setScanned(true);
        // navigation.navigate('ManageAccount');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Camera

                style={styles.camera}
                onBarCodeScanned={data => saveOfflineData(data.data)}
                type={facing === 'back' ? CameraType.back : CameraType.front}>
                {/* <View style={styles.buttonContainer}>
                    <Button label="Flip" onPress={toggleCameraFacing} />
                </View> */}

                <View style={styles.tooltipContainer}>
                    <Text style={styles.text}>Find a code to scan</Text>
                    <View style={{
                        alignSelf: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: '47%',
                    }}>
                        <AnimationLoader
                            isLoading={!scanned}
                            loop={true}
                            animationKey={'QR_SCANNER'} 
                            onAnimationComplete={undefined}   
                            width={300}
                            height={300}                 
                        />
                    </View>
                </View>

                {scanned && (
                    <Animated.View
                        style={styles.animationContainer}
                        entering={FadeInDown.delay(600)
                            .duration(1000)
                            .springify()}>
                        <Text style={styles.scannedText}>QR Code Scanned!</Text>
                        <Image
                            source={require('../assets/hawk1.png')}
                            style={styles.image}
                        />
                        <Button
                            onPress={() => setScanned(false)}
                            label={'Close'}
                        />
                    </Animated.View>
                )}
            </Camera>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    scannedText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    tooltipContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        // top: RFValue(-22.5),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    text: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        // paddingBottom: RFValue(500),
        height: '120%',
        color: '#ffffff',
    },
});
