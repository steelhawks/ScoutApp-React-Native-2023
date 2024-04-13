import React, {useState} from 'react';
import {Modal, TextInput, Button, View, StyleSheet} from 'react-native';

interface AndroidPromptProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (inputValue: string) => void;
}

const AndroidPrompt: React.FC<AndroidPromptProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Button title="OK" onPress={handleSubmit} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
    },
});

export default AndroidPrompt;
