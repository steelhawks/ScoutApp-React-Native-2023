import {useState} from 'react';
import Login from './components/Login';
import HomePage from './screens/HomePage';
import ScoutingPage from './screens/ScoutingPage';
import DataPage from './screens/DataPage';
import ExtraInfoPage from './screens/ExtraInfoPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
    const [logged_in, setLogin] = useState(false);

    const HomePageNavigate = props => {
        return <HomePage setLogin={setLogin} />;
    };
	
    const ScoutingPageNavigate = props => {
        return <ScoutingPage logged_in={logged_in} />;
    };

    return (
        <NavigationContainer initialRouteName="Login" backBehavior="firstRoute">
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Home" component={HomePageNavigate} />
                <Drawer.Screen
                    name="Scouting"
                    component={ScoutingPageNavigate}
                />
                <Drawer.Screen name="Data" component={DataPage} />
                <Drawer.Screen name="Extra Info" component={ExtraInfoPage} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
