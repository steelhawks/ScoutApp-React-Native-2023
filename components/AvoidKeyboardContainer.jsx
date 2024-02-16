import {SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';

const AvoidKeyboardContainer = ({children}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios'? 'padding' : 'height'}>
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    }
})

export default AvoidKeyboardContainer;
