import React, { useEffect, useState } from 'react';
import fs from 'react-native-fs';
import { Alert } from 'react-native';
import loginCredentialsFile from './login.json';

export const returnUserCredentials = async () => {
    try {
        const usersData = loginCredentialsFile; // Assuming 'file' is already a JSON object
        return usersData;
    } catch (error) {
        console.log(loginCredentialsFile);
        console.error('Error reading JSON file:', error);
        throw error;
    }
};

const auth = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Access the JSON content directly
        const parsedData = loginCredentialsFile;
        setUserData(parsedData);
    }, []);
}

export default auth;