import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../styles/Theme";

const ViewCreateUser = () => {
    const [user, setUser] = useState([]);


    function saveUser() {
        
    }

    return(
    <View style={theme.modal}>
                        <Text style={theme.title}>{user.id > 0 ? "Alterar Usuario" : "Criar Usuario"}</Text>
                        <Text>Nome</Text>
                        <TextInput
                            keyboardType='ascii-capable'
                            autoCapitalize='none'
                            value={user.name}
                            onChangeText={(value) => setUser({ ...user, name: value })}
                            style={theme.input}
                            placeholder="Name" />
                        <Text>Email</Text>
                        <TextInput
                            keyboardType='email-address'
                            autoCapitalize='none'
                            value={user.email}
                            onChangeText={(value) => setUser({ ...user, email: value })}
                            style={theme.input}
                            placeholder="Email" />
                        <Text>Senha</Text>
                        <TextInput
                            secureTextEntry={true}
                            keyboardType='password'
                            autoCapitalize='none'
                            value={user.password}
                            onChangeText={(value) => setUser({ ...user, password: value })}
                            style={theme.input}
                            placeholder="Password" />
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <View style={{ flex: 1 }}>
                                <Text>Idade</Text>
                                <TextInput
                                    keyboardType='decimal-pad'
                                    autoCapitalize='none'
                                    value={user.age} onChangeText={(value) => setUser({ ...user, age: value })}
                                    style={[theme.input, { width: "40%" }]}
                                    placeholder="Age" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Sexo (M ou F)</Text>
                                <ScrollView horizontal={true} >
                                    <TouchableOpacity onPress={() => setUser({ ...user, sex: "M" })}>
                                        <Ionicons name="md-man-sharp" size={40} color={user.sex == "M" ? "blue" : "gray"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setUser({ ...user, sex: "F" })}>
                                        <Ionicons name="md-woman" size={40} color={user.sex == "F" ? "pink" : "gray"} />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                        <CustomButton label="salvar" backgroundColor="blue" textColor="white" style={theme.button} onPress={saveUser} />
                    </View>
    )
}

export default ViewCreateUser;