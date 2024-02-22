export const fetchTeamDataFromServer = async serverIp => {
    try {
        const teamDataResponse = await fetch(
            `http://${serverIp}:8080/get_team_data`,
        );

        if (teamDataResponse.ok) {
            const teamData = await teamDataResponse.json();
            return teamData
        } else {
            console.error('Error fetching team data:', teamDataResponse.status);
            // Handle the error as needed
        }

        // return teamData;
    } catch (error) {
        throw new Error(`Error requesting team data from the server: ${error}`);
    }
};
