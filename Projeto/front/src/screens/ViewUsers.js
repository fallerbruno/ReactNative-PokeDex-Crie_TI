import { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../styles/Theme';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import FloatingButton from '../components/FloatingButton';
import { Modalize } from 'react-native-modalize';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import { } from "react-native-gesture-handler"
import Cardusers from '../components/CardUsers';

export default ViewUsers = ({ navigation }) => {

    const fieldUser = "myapp_usuario";
    const fieldPassword = "myapp_senha";
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    //usuario vazio
    const initialUser = {
        id: 0,
        age: 0,
        email: "",
        name: "",
        password: "",
        sex: ""
    }

    const [user, setUser] = useState({ initialUser })
    //abre modal com usuario setado
    function alterUser(user) {
        onOpenModal()
        setUser(user)
    }
    //abre modal com novo usuario
    function newUser(user) {
        onOpenModal()
        setUser(initialUser)
    }

    //sfaz post pra api

    function saveUser() {

    }

    const { username, password } = useContext(AppContext);
    console.log('CREDENTIALS=>', username);

    /*
        Busca os usuários da API (através do listUsers)
        na criação do componente ViewUsers
    */
    useEffect(() => {
        listUsers();
    }, [])

    async function listUsers() {

        setLoading(true);

        //console.log('CREDENTIALS=>', _username, _password);

        const response = await fetch('http://177.44.248.33:3000/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();

        setLoading(false);
        if (json) {
            setUsers(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }
    const modalRef = useRef(null)

    function onOpenModal() {

        if (modalRef != null) {

            modalRef.current?.open();
        }
    }

    function RenderItem({ item }) {
        const icone_sexo = item.sex == 'M' ? 'man' : 'woman';

        return <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.card, theme.shadows]} key={item.id} onPress={() => alterUser(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name={icone_sexo} size={24}
                    color={item.sex == 'M' ? "#7986CB" : "#F06292"}
                    style={{ marginRight: 16 }} />
                <View>
                    <Text style={styles.titleCard}>{item.name}</Text>
                    <Text style={styles.subtitleCard}>{item.email}</Text>
                </View>
            </View>
            <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
    }


    return (
        <View style={theme.container}>
            {/* <SkeletonPlaceholder
                speed={600}>
                <SkeletonPlaceholder.Item
                    width={200}
                    height={45} />
            </SkeletonPlaceholder> */}
            <FlatList
                data={users}
                onRefresh={() => listUsers()}
                refreshing={loading}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
            />

            <FloatingButton onPress={() => newUser()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>

                <Modalize
                    keyboardAvoidingBehavior='height'
                    ref={modalRef}
                    snapPoint={500}
                    height={400}
                >
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

                </Modalize>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 16,
        padding: 8,
        height: 55,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleCard: {
        color: '#000',
        fontSize: 16,
        fontFamily: "Ubuntu_700Bold",
    },
    subtitleCard: {
        color: '#555',
        fontSize: 13,
        fontFamily: "Ubuntu_400Regular",
    }
});