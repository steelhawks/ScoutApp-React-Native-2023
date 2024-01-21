import React, { useState } from'react';
import { AsyncStorage } from 'react-native';
import SensitiveInfo from 'react-native-sensitive-info';

const encryptionKey = 'ENTER_STRONG_KEY';

export const saveCredentials = async (username, password) => {
    try {
        const credentials = JSON.stringify({username, password});
        await SensitiveInfo.setItem('credentials', credentials, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
            encrypt: true,
        });
        console.log('Credentials saved successfully!');
    } catch (error) {
        console.error('Error saving credentials:', error);
    }
};

// DECRYPTS AND RETRIEVES CREDS
const getCredentials = async () => {
    try {
        const encryptedCredentials = await SensitiveInfo.getItem('credentials', {
            sharedPreferencesName:'mySharedPrefs',
            keychainService:'myKeychain',
        });
    } catch (error) {
        console.log('Error getting credentials:', error);
        return null;
    }
};

// EXAMPLE USAGE
if (__DEV__) {
    saveCredentials('testUser', 'testPassword');
}

getCredentials();