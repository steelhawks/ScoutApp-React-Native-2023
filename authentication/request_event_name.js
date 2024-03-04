import RNFS from 'react-native-fs';

const saveFilePath = RNFS.DocumentDirectoryPath + '/data/eventName.json';

export const fetchEventNameFromServer = async serverIp => {
    try {
        const response = await fetch(
            `http://${serverIp}:8080/api/competition`,
        );

        if (response.ok) {
            const eventName = await response.json();

            // ensure the directory exists
            try {
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/data');
                console.log('Located at', RNFS.DocumentDirectoryPath);
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
                // Handle the error as needed
            }

            // save eventName to a JSON file
            try {
                await RNFS.writeFile(saveFilePath, JSON.stringify(eventName, null, 2), 'utf8');
                console.log('Event name saved successfully.');
            } catch (writeError) {
                console.error('Error writing event name to file:', writeError);
            }

            return eventName;
        } else {
            throw new Error(`Server not reachable. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(
            `Error requesting event name from the server: ${error}`,
        );
    }
};
