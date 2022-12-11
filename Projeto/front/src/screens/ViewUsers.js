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
        const background = item.sex == 'M' ? '#83A2E3' : '#EBA8C3';
        return <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.card, theme.shadows, {backgroundColor: background}] } key={item.id} onPress={() => alterUser(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name={icone_sexo} size={24}
                    color={item.sex == 'M' ? "#427CF5" : "#F06292"}
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
        <View style={theme.modal2}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 16,
        padding: 8,
        height: 55,
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