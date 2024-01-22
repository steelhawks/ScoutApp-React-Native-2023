import React, { useEffect, useState } from 'react';
import fs from 'react-native-fs';
import { Alert } from 'react-native';
import file from './login.json';

export const returnUserCredentials = async () => {
    try {
        const usersData = file; // Assuming 'file' is already a JSON object
        return usersData;
    } catch (error) {
        console.log(file);
        console.error('Error reading JSON file:', error);
        throw error;
    }
};

const auth = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Access the JSON content directly
        const parsedData = file;
        setUserData(parsedData);
    }, []);
}

export default auth;