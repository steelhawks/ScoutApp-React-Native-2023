<h1 align="center">Steel Hawks: Scout 24 | HawkEye</h1>

![Static Badge](https://img.shields.io/badge/Team-2601-red?style=for-the-badge&link=https%3A%2F%2Fsteelhawks.org)

Scout 24 is the Steel Hawks defacto scouting app, written in React Native for both iOS and Android. It relys on ReactNative-Server-Sync-2024 but has an offline mode for user authentication and actions on the app.

Features:
* User authentication
* Post match editing
* Wireless and Offline Sync
* Pit scouting and match scouting

<div style="display: flex; justify-content: center; align-items: center;">
  <img width="20%" src="https://github.com/steelhawks/ScoutApp-React-Native-2023/blob/main/documentation/demonstration01.gif?raw=true">
  <img width="20%" src="https://github.com/steelhawks/ScoutApp-React-Native-2023/blob/main/documentation/demonstration02.gif?raw=true">
  <img width="20%" src="https://github.com/steelhawks/ScoutApp-React-Native-2023/blob/main/documentation/demonstration03.gif?raw=true">
</div>

## Installation
Follow these steps to get the app running on your local machine:

This does not cover prerequisites such as Xcode or Android Studio. Please find another tutorial to help with that. Remember that for iOS development you NEED a Mac. If you can get Expo Go working you could have iOS working but for NATIVE support and for building, you NEED a Mac for iOS support.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/steelhawks/ScoutApp-React-Native-2023.git
   cd ScoutApp-React-Native-2023
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the app**
   ```bash
   # For iOS (Only on Mac)
   npx expo run:ios
   
   # For Android
   npx expo run:android
   ```
## Maintaining
### Code Quality
* Consistent Code Style: Use a linter like ESLint and a formatter like Prettier to maintain consistent code style.
* Type Safety: I recommend to continue using Typescript for static type casting and to catch silly errors.
### Documentation
* Inline Comments: Add comments to explain complex logic and decisions.
* Update README: Keep this README updated with any significant changes to this project. 

### GitHub Build Actions
There are multiple build actions but the most important one is the Build Android APK one. This is a very useful automation making Android APKs on each push to the main branch. Because of this, many experimental, developmental, or any other small changes should be pushed to the dev branch instead of the main branch. Once you are ready for a release create a pull request to main. In addition, before each pull request, make sure you change the data in the release-info.json, as that is what the GitHub automation reads from to name the release.