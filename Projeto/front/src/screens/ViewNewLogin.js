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
        age: 0,
        sex: "",
        saveUser: false,
    }

    const { saveUser, password, username, age, sex } = useContext(AppContext);
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
                const age =json.age
                const sex = json.sex
                setLoading(false);
                if (json.id) {
                    //dados Ok =>navegar adiante
                    saveUser(user, pass, id, age, sex);
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
                    logoImageStyle={{ width: "100%" }}
                    loginButtonStyle={{ backgroundColor: "#8BBE8A", color: "white", fontFamily: "Ubuntu_700Bold" }}
                    logoImageSource={require("../assets/logo.jpg")}
                    signupStyle={{ backgroundColor: "#58ABF6", width: "90%", textAlign: "center", padding: 10, alignSelf: "center", borderRadius: 8 }}
                    signupTextStyle={{ color: "white", fontFamily: "Ubuntu_700Bold" }}
                    style={{ backgroundColor: 'white' }}
                    onLoginPress={() => login(novoUsuario.username, novoUsuario.password)}
                    onSignupPress={() => navigation.navigate("ViewCreateUser")}
                    onEmailChange={(email) => { novoUsuario.username = email }}
                    onPasswordChange={(password) => { novoUsuario.password = password }}
                    disableSocialButtons
                    textInputContainerStyle={{ fontFamily: "Ubuntu_700Bold", borderColor: "#58ABF6" }}
                />
            }
        </KeyboardAvoidingView>
    );
}

export default ViewNewLogin;