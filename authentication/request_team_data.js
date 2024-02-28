import RNFS from 'react-native-fs';

const saveFilePath = RNFS.DocumentDirectoryPath + '/data/teamData.json';

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
                await RNFS.writeFile(saveFilePath, JSON.stringify(teamData, null, 2), 'utf8');
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
                const savedTeamData = await RNFS.readFile(saveFilePath, 'utf8');
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
