import RNFS from 'react-native-fs';

const teamDataSaveFilePath = RNFS.DocumentDirectoryPath + '/data/teamData.json';
const eventNameSaveFilePath =
    RNFS.DocumentDirectoryPath + '/data/eventName.json';

export const fetchUserCredentialsFromServer = async (
    serverIp,
    username,
    osis,
    appVersion,
) => {
    try {
        const response = await fetch(`http://${serverIp}:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, osis, appVersion}),
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else if (response.status === 400) {
            return false; // Returns false if the app version is mismatched with the server version
        } else {
            throw new Error(`Server not reachable. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(
            `Error requesting login data from the server: ${error}`,
        );
    }
};

export const fetchServerType = async serverIp => {
    try {
        const serverTypeResponse = await fetch(
            `http://${serverIp}:8080/api/get_server_type`,
        );

        if (serverTypeResponse.ok) {
            const serverType = await serverTypeResponse.json();
            return serverType;
        } else {
            console.error(
                'Error fetching server type:',
                serverTypeResponse.status,
            );
        }
    } catch (error) {
        throw new Error(`Error requesting server type: ${error}`);
    }
};

export const fetchTeamDataFromServer = async serverIp => {
    try {
        const teamDataResponse = await fetch(
            `http://${serverIp}:8080/get_team_data`,
        );

        if (teamDataResponse.ok) {
            const teamData = await teamDataResponse.json();

            // ensure the directory exists
            try {
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/data');
                console.log('Located at', RNFS.DocumentDirectoryPath);
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
                // Handle the error as needed
            }

            // save teamData to a JSON file
            try {
                await RNFS.writeFile(
                    teamDataSaveFilePath,
                    JSON.stringify(teamData, null, 2),
                    'utf8',
                );
                console.log('Team data saved successfully.');
            } catch (writeError) {
                console.error('Error writing team data to file:', writeError);
                // Handle the error as needed
            }

            return teamData;
        } else {
            console.error('Error fetching team data:', teamDataResponse.status);

            // read data from the JSON file if available
            try {
                const savedTeamData = await RNFS.readFile(
                    teamDataSaveFilePath,
                    'utf8',
                );
                const parsedData = JSON.parse(savedTeamData);
                console.log('Returning data from the JSON file:', parsedData);
                return parsedData;
            } catch (readError) {
                console.error('Error reading saved team data:', readError);
                // Handle the error as needed
            }
        }
    } catch (error) {
        throw new Error(`Error requesting team data from the server: ${error}`);
    }
};

export const fetchEventNameFromServer = async serverIp => {
    try {
        const response = await fetch(`http://${serverIp}:8080/api/competition`);

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
                await RNFS.writeFile(
                    eventNameSaveFilePath,
                    JSON.stringify(eventName, null, 2),
                    'utf8',
                );
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
