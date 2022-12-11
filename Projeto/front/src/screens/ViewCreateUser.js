import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../styles/Theme";
import axios from 'axios'
const ViewCreateUser = ({ navigation, route }) => {
    const [user, setUser] = useState([]);

    async function RegisterNewUser() {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            age: user.age,
            sex: user.sex,
        }
        console.log(data)
        axios('http://177.44.248.33:3000/users', {
            method: 'post',
            data: data

        })
            .then(function (response) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "ViewNewLogin" }]
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <View style={styles.container}>
            <Text style={theme.titleWhite}>{user.id > 0 ? "Alterar Usuario" : "Criar Usuario"}</Text>
            <Text style={theme.labelWhite}>Nome</Text>
            <TextInput
                keyboardType='ascii-capable'
                autoCapitalize='none'
                value={user.name}
                onChangeText={(value) => setUser({ ...user, name: value })}
                style={theme.inputModal}
                placeholder="Name" />
            <Text  style={theme.labelWhite}>Email</Text>
            <TextInput
                keyboardType='email-address'
                autoCapitalize='none'
                value={user.email}
                onChangeText={(value) => setUser({ ...user, email: value })}
                style={theme.inputModal}
                placeholder="Email" />
            <Text  style={theme.labelWhite}>Senha</Text>
            <TextInput
                secureTextEntry={true}
                keyboardType='password'
                autoCapitalize='none'
                value={user.password}
                onChangeText={(value) => setUser({ ...user, password: value })}
                style={theme.inputModal}
                placeholder="Password" />
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                    <Text  style={theme.labelWhite}>Idade</Text>
                    <TextInput
                        keyboardType='decimal-pad'
                        autoCapitalize='none'
                        value={user.age} onChangeText={(value) => setUser({ ...user, age: value })}
                        style={[theme.inputModal, { width: "40%" }]}
                        placeholder="Age" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text  style={theme.labelWhite}>Sexo</Text>
                    <ScrollView horizontal={true} >
                        <TouchableOpacity onPress={() => setUser({ ...user, sex: "M" })}>
                            <Ionicons name="md-man-sharp" size={40} color={user.sex == "M" ? "#58ABF6" : "white"}  />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setUser({ ...user, sex: "F" })}>
                            <Ionicons name="md-woman" size={40} color={user.sex == "F" ? "pink" : "white"} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            <CustomButton width="100%" label="salvar" backgroundColor="#8BBE8A" textColor="white" style={theme.button} onPress={() => RegisterNewUser()} />
        </View>
    )
}

export default ViewCreateUser;

export const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, backgroundColor: "#333"
    }
})