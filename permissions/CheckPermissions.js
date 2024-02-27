import {check, checkMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const CheckDefaultPermissions = async () => {
	checkMultiple(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then(result => {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log(
                    'This feature is not available (on this device / in this context)',
                );
                break;
            case RESULTS.DENIED:
                console.log(
                    'The permission has not been requested / is denied but requestable',
                );
                break;
            case RESULTS.LIMITED:
                console.log(
                    'The permission is limited: some actions are possible',
                );
                break;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                break;
            case RESULTS.BLOCKED:
                console.log(
                    'The permission is denied and not requestable anymore',
                );
                break;
        }
    })
    .catch(error => {
        console.log('Error checking permissions:', error);
    });
}

export const CheckPermission = async (permission) => {
	check(permission)
    .then(result => {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log(
                    'This feature is not available (on this device / in this context)',
                );
                break;
            case RESULTS.DENIED:
                console.log(
                    'The permission has not been requested / is denied but requestable',
                );
                break;
            case RESULTS.LIMITED:
                console.log(
                    'The permission is limited: some actions are possible',
                );
                break;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                break;
            case RESULTS.BLOCKED:
                console.log(
                    'The permission is denied and not requestable anymore',
                );
                break;
        }
    })
    .catch(error => {
        console.log('Error checking permissions:', error);
    });
}
