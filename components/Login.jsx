import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { saveCredentials, getCredentials } from '../authentication/auth'; // Assuming you have saved the functions in a file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Perform your authentication logic here
    // For simplicity, let's assume username and password are correct
    const isAuthenticated = true;

    if (isAuthenticated) {
      // Save credentials securely
      await saveCredentials(username, password);
      Alert.alert('Login Successful', 'Credentials saved securely.');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
