import React, {useState} from 'react';
import {View} from 'react-native';
import Button from './Button';

const DriveStationUI = props => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonPress = (buttonNumber, color) => {
        props.updateDict('driveStation', buttonNumber);
        setSelectedButton(buttonNumber);
        console.log(`Selected Button: ${color} ${buttonNumber}`);
    };

    return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{color: 'blue'}}>
                {[1, 2, 3].map(buttonNumber => (
                    <Button
                        key={buttonNumber}
                        onPress={() => handleButtonPress(buttonNumber, 'Red')}
                        label={`Red ${buttonNumber}`}
                        style={{
                            backgroundColor:
                                selectedButton === buttonNumber
                                    ? '#ff6961'
                                    : 'transparent',
                        }}
                    />
                ))}
            </View>
            <View>
                {[4, 5, 6].map(buttonNumber => (
                    <Button
                        key={buttonNumber}
                        onPress={() => handleButtonPress(buttonNumber, 'Blue')}
                        label={`Blue ${buttonNumber - 3}`}
                        style={{
                            backgroundColor:
                                selectedButton === buttonNumber
                                    ? 'rgba(67, 80, 175, 1)'
                                    : 'transparent',
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default DriveStationUI;
