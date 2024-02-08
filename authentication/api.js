export const fetchUserCredentialsFromServer = async (serverIp, username, password) => {
    try {
        const response = await fetch(`http://${serverIp}:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Server not reachable. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error connecting to the server: ${error}`);
    }
};
