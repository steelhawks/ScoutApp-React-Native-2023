import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Dropdown from '../components/inputs/Dropdown';

const HomePage = props => {
    const [usernameVal, setUsername] = useState('');
    const [passwordVal, setPassword] = useState('');

    const login = () => {
        // if (usernameVal === '1' && passwordVal === '2') {
        //   props.setLogin(true);
        // }
        if (true) {
            props.setLogin(true);
        }
    };

    return (
        <SafeAreaView style={styles.MainView}>
            <View style={styles.TextView}>
                <Text style={styles.Text}>ScoutApp</Text>
            </View>

            <View style={[styles.TextView, {marginTop: 100}]}>
                <Text style={styles.SmallText}>Event:</Text>
                {/* <Dropdown style={styles.Dropdown} /> */}

                {/* <Input type={"dropdown"} title={"Event"} titleStyle={styles.SmallText} style={styles.Dropdown} />

        <Input type={"text"} title={"Event"} titleStyle={styles.SmallText} style={styles.Dropdown} /> */}

                <Text style={styles.SmallText}>Username:</Text>
                <TextInput
                    maxLength={15}
                    style={styles.TextInput}
                    val={usernameVal}
                    onChangeText={text => setUsername(text)}></TextInput>

                <Text style={styles.SmallText}>Password:</Text>
                <TextInput
                    maxLength={15}
                    style={styles.TextInput}
                    val={passwordVal}
                    onChangeText={text => setPassword(text)}></TextInput>

                <TouchableOpacity style={styles.Button} onPress={login}>
                    <Text style={{color: 'white', fontSize: 30}}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    TextView: {
        backgroundColor: 'maroon',
        opacity: 0.3,
        alignItems: 'center',
        padding: 40,
    },
    Text: {
        fontSize: 100,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
    },
    TextInput: {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        width: 300,
    },
    SmallText: {
        fontSize: 40,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
    },
    MainView: {
        backgroundColor: 'black',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    Button: {
        marginTop: 40,
        backgroundColor: '#8B0000',
        padding: 10,
    },
});
