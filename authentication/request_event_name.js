export const fetchEventNameFromServer = async serverIp => {
    try {
        const response = await fetch(
            `http://${serverIp}:8080/api/competition`,
        );

        if (response.ok) {
            const eventName = await response.json();
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
