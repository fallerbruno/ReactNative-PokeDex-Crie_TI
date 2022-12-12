import React, { useContext, useRef, } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/Theme';
import { FlatList } from 'react-native-gesture-handler';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import CardPokemonUser from '../components/CardPokemonUser';
const base64 = require('base-64');
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { Modalize } from 'react-native-modalize';
import RnGH from 'react-native-gesture-handler';
import Header from '../components/Header';
const { useState, useEffect } = React;
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const ViewMyProfile = ({ navigation, route }) => {
    const { username, password, id, age, sex } = useContext(AppContext);
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})



    function saveUser() {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            age: +user.age,
            sex: user.sex,
        }
        console.log(data)
        axios(`http://177.44.248.33:3000/users/${id}`, {
            method: 'put',
            data: data

        })
            .then(function (response) {
                onOpenModalB()

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const modalA = useRef(null);
    const modalB = useRef(null);

    const [modalAOpen, setModalAOpen] = useState(false);
    const [modalBOpen, setModalBOpen] = useState(false);

    function onOpenModalA() {
        if (modalAOpen) {
            modalA.current?.close();
        } else {
            modalA.current?.open();
        }
    }
    function onOpenModalB() {
        onOpenModalA()
        if (modalBOpen) {
            modalB.current?.close();
        } else {
            modalB.current?.open();
        }
    }


    useEffect(() => {
        listUsers();

    }, [])

    async function listUsers() {

        setLoading(true);

        const response = await fetch(`http://177.44.248.33:3000/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();

        setLoading(false);
        if (json) {
            setUser(json);

        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }

    let html = `
    <html>
      <body>
        <h1>Hi ${username}</h1>
        <p style="color: black;">Your List of Pokemons Registred</p>
        <table border="1" style="width:100%">
        <tr>
            <th>Pokemon Name</th>
            <th>Shiny</th>
            <th>Nature</th>
            <th>Move 1</th>
            <th>Move 2</th>
            <th>Move 3</th>
            <th>Move 4</th>
        </tr>
        `
    pokemon.forEach(pokemon => {
        html += `<tr>
            <td>${pokemon.name}</td>
            <td>${pokemon.shiny}</td>
            <td>${pokemon.Nature.name}</td>
            <td>${pokemon.move1}</td>
            <td>${pokemon.move2}</td>
            <td>${pokemon.move3}</td>
            <td>${pokemon.move4}</td>
        </tr> `
    });
    html += `</table>
        <H2>COPYRIGHT: POKEDEX FALLER</H2>
        </body>
        </html>`;
    let generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    };

    useEffect(() => {
        ListPokemons();
    }, [])

    async function ListPokemons() {
        //console.log('CREDENTIALS=>', _username, _password);

        const response = await fetch(`http://177.44.248.33:3000/pokemonsregister?UserId=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();


        if (json) {
            setPokemon(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }

    function RenderItem({ item }) {
        return <CardPokemonUser {...item} render={() => ListPokemons()} />
    }




    return (
        <>
            <Header label="USER PROFILE" />
            <View style={[theme.modal, { padding: 10, borderWidth: 2, borderColor: "white", borderRadius: 8 }]}>

                <Text style={theme.labelWhite}>User : {username}</Text>
                <Text style={theme.labelWhite}>Sex : {sex}</Text>
                <Text style={theme.labelWhite}>Age : {age.toString()}</Text>
                <TouchableOpacity onPress={() => onOpenModalA()}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={theme.labelWhite}>EDIT PROFILE</Text>
                        <FontAwesome name="edit" size={30} color="#91D8DF" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => generatePdf()}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={theme.labelWhite}>GENERATE PDF</Text>
                        <FontAwesome name="file-pdf-o" size={30} color="#FFA756" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[theme.container, theme.conintanerblack]}>
                <Text style={theme.titleWhite}>MY POKEMONS</Text>

                <FlatList
                    //ListHeaderComponent={}
                    //ItemSeparatorComponent={}
                    data={pokemon}
                    onRefresh={() => ListPokemons()}
                    refreshing={loading}
                    keyExtractor={item => item.id}
                    renderItem={RenderItem}
                    numColumns={2}
                />
               
            </View>

            <Modalize
                ref={modalA}
                onOpen={() => setModalAOpen(true)}
                onClose={() => setModalAOpen(false)}
                keyboardAvoidingBehavior='height'
                snapPoint={480}
                height={380}
            >
                <View style={styles.container}>
                    <Text style={theme.titleWhite}>User Edit</Text>

                    <Text style={theme.labelWhite}>Name</Text>
                    <TextInput
                        keyboardType='ascii-capable'
                        autoCapitalize='none'
                        value={user.name}
                        onChangeText={(value) => setUser({ ...user, name: value })}
                        style={theme.inputModal}
                        placeholder="Name" />

                    <Text style={theme.labelWhite}>Email</Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={user.email}
                        onChangeText={(value) => setUser({ ...user, email: value })}
                        style={theme.inputModal}
                        placeholder="Email" />

                    <Text style={theme.labelWhite}>Password</Text>
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
                            <Text style={theme.labelWhite}>Age</Text>

                            <TextInput
                                keyboardType='decimal-pad'
                                value={age.toString()}
                                onChangeText={(value) => setUser({ ...user, age: value })}
                                style={[theme.inputModal, { width: "40%" }]}
                                placeholder="Age" />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={theme.labelWhite}>Sex</Text>
                            <ScrollView horizontal={true} >

                                <TouchableOpacity onPress={() => setUser({ ...user, sex: "M" })}>
                                    <Ionicons name="md-man-sharp" size={40} color={user.sex == "M" ? "#58ABF6" : "white"} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setUser({ ...user, sex: "F" })}>
                                    <Ionicons name="md-woman" size={40} color={user.sex == "F" ? "pink" : "white"} />
                                </TouchableOpacity>

                            </ScrollView>

                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <CustomButton width="48%" label="Save" backgroundColor="#8BBE8A" textColor="white" style={theme.button} onPress={() => saveUser()} />
                        <CustomButton width="48%" label="Cancel" backgroundColor="#FFA756" textColor="white" style={theme.button} onPress={() => onOpenModalA()} />
                    </View>

                </View>

            </Modalize>

            <Modalize
                ref={modalB}
                onOpen={() => setModalBOpen(true)}
                onClose={() => setModalBOpen(false)}
                keyboardAvoidingBehavior='height'
                snapPoint={200}
                height={200}
                modalStyle={theme.modal}>
                <View style={styles.container}>
                    <Text style={theme.email}>You Changed Your Profile Successfully, Gonna be Redirected to Login Screen</Text>
                    <CustomButton width="100%" label="Confirm" backgroundColor="#8BBE8A" textColor="white" style={[theme.button, { textAlign: "center", flex: 1 }]} onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: "ViewNewLogin" }]
                    })} />
                </View>
            </Modalize>

        </>

    )
}

export default ViewMyProfile

export const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, backgroundColor: "#333"
    }
})