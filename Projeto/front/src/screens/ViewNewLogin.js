import React, { useEffect, useState, useContext } from 'react';
import LoginScreen from "react-native-login-screen";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const base64 = require('base-64');
import { AppContext } from '../context/AppContext';
import { theme } from '../styles/Theme';

const ViewNewLogin = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    const novoUsuario = {
        username: '',
        password: '',
        id: 0,
        saveUser: false,
    }

    const{ saveUser, password, username } = useContext(AppContext);
    console.log('Vars => ', username, password);

    function login(user, pass) {
        setLoading(true);

        setTimeout(() => {

            async function testLogin() {
                const response = await fetch('http://177.44.248.33:3000/auth', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' +
                            base64.encode(user + ":" + pass)
                    }
                });
                const json = await response.json();
                const id = json.id
                setLoading(false);
                if (json.id) {
                    //dados Ok =>navegar adiante
                    saveUser(user, pass, id );
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "ViewNav1" }]
                    });
                } else {
                    Alert.alert('Que pena 😥', json.message);
                }
            }

            testLogin();

        }, 900)

    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={theme.container}>
            {loading == true ? <ActivityIndicator size='large' color='#000' />
                :
                <LoginScreen
                    logoImageStyle={{width:"100%"}}
                    loginButtonStyle={{backgroundColor: "green"}}
                    logoImageSource={require("../assets/logo.jpg")}
                    style={{ backgroundColor: 'white' }}
                    onLoginPress={() => login(novoUsuario.username, novoUsuario.password)}
                    onSignupPress={() => navigation.navigate("ViewCreateUser")}
                    onEmailChange={(email) => { novoUsuario.username = email }}
                    onPasswordChange={(password) => { novoUsuario.password = password }}
                    disableSocialButtons
                />
            }
        </KeyboardAvoidingView>
    );
}

export default ViewNewLogin;