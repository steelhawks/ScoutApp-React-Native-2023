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
        throw new Error(`Error requesting login data from the server: ${error}`);
    }
};
