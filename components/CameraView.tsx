import {Alert, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import Button from '../components/inputs/Button';
import fs from 'react-native-fs';
import {useState} from 'react';

const docDir = fs.DocumentDirectoryPath;

export const CameraView = ({navigation}: any) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = Camera.useCameraPermissions();

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

        navigation.navigate('ManageAccount');
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                onBarCodeScanned={data => saveOfflineData(data.data)}
                type={facing === 'back' ? CameraType.back : CameraType.front}>
                <View style={styles.buttonContainer}>
                    <Button label="Flip" onPress={toggleCameraFacing} />
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        borderRadius: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
});
