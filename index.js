import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createContext} from 'react';

//Components
// export {default as Input} from "./components/Input";
export {default as NewMatch} from "./components/NewMatch";

//inputcomponents
export {default as Checkbox} from "./components/inputs/Checkbox";
export {default as CustomTextInput} from "./components/inputs/CustomTextInput";
export {default as Dropdown} from "./components/inputs/TeamDropdown";
export {default as RadioGroup} from "./components/inputs/RadioGroup";

//screens
export {default as DataPage} from "./screens/DataPage";
export {default as ScoutingPage} from "./screens/ScoutingPage";

const UserContext = createContext();

export { UserContext }

AppRegistry.registerComponent(appName, () => App);
