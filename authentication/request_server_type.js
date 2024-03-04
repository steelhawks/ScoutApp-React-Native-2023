export const fetchServerType = async serverIp => {
    try {
        const serverTypeResponse = await fetch(
            `http://${serverIp}:8080/api/get_server_type`,
        );

        if (serverTypeResponse.ok) {
            const serverType = await serverTypeResponse.json();
            return serverType;
        } else {
            console.error('Error fetching server type:', serverTypeResponse.status);
        }
    } catch (error) {
        throw new Error(`Error requesting server type: ${error}`);
    }
};
