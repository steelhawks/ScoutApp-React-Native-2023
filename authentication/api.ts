import RNFS from 'react-native-fs';

const teamDataSaveFilePath = RNFS.DocumentDirectoryPath + '/data/teamData.json';
const eventNameSaveFilePath =
    RNFS.DocumentDirectoryPath + '/data/eventName.json';
const formDataSaveFilePath = RNFS.DocumentDirectoryPath + '/data/formData.json';

const SERVER_ENDPOINT = 'https://steelhawks.herokuapp.com'; // prod
// const SERVER_ENDPOINT = 'http://127.0.0.1:8080'; // dev
export const fetchUserCredentialsFromServer = async (
    username: string,
    osis: string,
    appVersion: any,
) => {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/login`, {
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

export const fetchTeamDataFromServer = async () => {
    try {
        const teamDataResponse = await fetch(
            `${SERVER_ENDPOINT}/get_team_data`,
        );

        if (teamDataResponse.ok) {
            const teamData = await teamDataResponse.json();

            // ensure the directory exists
            try {
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/data');
                console.log('Located at', RNFS.DocumentDirectoryPath);
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
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
            }
        }
    } catch (error) {
        throw new Error(`Error requesting team data from the server: ${error}`);
    }
};

export const fetchEventNameFromServer = async () => {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/competition`);

        if (response.ok) {
            const eventName = await response.json();

            // ensure the directory exists
            try {
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/data');
                console.log('Located at', RNFS.DocumentDirectoryPath);
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
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

export const fetchFormsFromServer = async () => {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/forms`);

        if (response.ok) {
            const forms = await response.json();

            // ensure the directory exists
            try {
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/data');
                console.log('Located at', RNFS.DocumentDirectoryPath);
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
            }

            // save forms to a JSON file
            try {
                await RNFS.writeFile(
                    formDataSaveFilePath,
                    JSON.stringify(forms, null, 2),
                    'utf8',
                );
                console.log('Form data saved successfully.');
            } catch (writeError) {
                console.error('Error writing event name to file:', writeError);
            }

            return forms;
        } else {
            throw new Error(`Server not reachable. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(
            `Error requesting event name from the server: ${error}`,
        );
    }
};

export const uploadDataToServer = async (data: any)  => { // fix to find type later
    console.log(typeof data);
    const response = await fetch(`${SERVER_ENDPOINT}/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.ok;
};