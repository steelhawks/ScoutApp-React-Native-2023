// // RequestLocalNetworkPermissions.js
// import { useEffect } from 'react';
// import { Platform } from 'react-native';
// import NetworkInfo from 'react-native-network-info';

// const RequestLocalNetworkPermissions = ({ onPermissionGranted, onPermissionDenied }) => {
//   useEffect(() => {
//     const requestPermissions = async () => {
//       try {
//         if (Platform.OS === 'ios') {
//           // For iOS, check and request local network permissions
//           const isPermissionGranted = await NetworkInfo.isPermissionGranted();

//           if (!isPermissionGranted) {
//             await NetworkInfo.requestLocalWiFiPermission();
//           }
//         } else if (Platform.OS === 'android') {

//           if (!isPermissionGranted) {
//             // Handle the denial of permission
//             onPermissionDenied();
//             return;
//           }
//         }

//         // Permission granted, proceed with your logic
//         onPermissionGranted();
//       } catch (error) {
//         console.error('Error requesting local network permissions:', error);
//       }
//     };

//     requestPermissions();
//   }, [onPermissionGranted, onPermissionDenied]);

//   return null;
// };

// export default RequestLocalNetworkPermissions;
