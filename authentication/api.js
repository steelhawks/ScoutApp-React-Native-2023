export const fetchUserCredentialsFromServer = async (serverIp, username, password, appVersion) => {
    try {
        const response = await fetch(`http://${serverIp}:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, appVersion }),
        });

        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            return false; // returns false if the app version is mismatched with the server version
        } else {
            throw new Error(`Server not reachable. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error requesting from the server: ${error}`);
    }
};
