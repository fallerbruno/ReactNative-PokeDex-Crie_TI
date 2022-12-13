import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";
import { AppContext } from '../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { theme } from '../styles/Theme';
import CustomButton from './CustomButton';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
const base64 = require('base-64');
import { AntDesign } from '@expo/vector-icons';


import { colorsByType, colorsByTypeTag } from './CardPokemon';
import FloatingButton from './FloatingButton';

const { width, height } = Dimensions.get('window');

// import { Container } from './styles';

const CardPokemonRegister = (pokemon) => {
    const modalRef = useRef(null)

    function onOpenModal() {

        if (modalRef != null) {

            modalRef.current?.open();
        }
    }
    const [pokemonCapture, setPokemonCapture] = useState([]);
    const { username, password, id } = useContext(AppContext);
    const icone_sexo = pokemon.sex == 'M' ? 'man' : 'woman';

    useEffect(() => {
        getPokemonforconsulte(pokemon);
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);

    async function sendEmail() {

        const data = {
            subject: `Tenho Interesse em seu pokemom ${pokemon.name}`,
            message: "Ola tenho interesse em seu Pokemon",
            to: pokemon.User.email,
            read: false,
            from: username,
            senderId: id,
            recipientId: pokemon.UserId
        }
        console.log(data);


        axios('http://177.44.248.33:3000/email/', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: data

        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });

        axios('http://177.44.248.33:3000/message/', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: data

        })
            .then(function (response) {
                onOpenModal()
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    async function getPokemonforconsulte(pokemon) {

        const response = await fetch(`http://177.44.248.33:3000/pokemons?name=${pokemon.name}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        if (json) {
            let JJSOn = json[0]
            setPokemonCapture(JJSOn);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }
    }

    let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
    const description = pokemon.description.replace(/(\r\n|\n|\r)/gm, "");
    return (
        <>
            <TouchableOpacity activeOpacity={0.6} style={[{ backgroundColor: colorsByTypeTag(pokemon.type1) }, theme.shadows, theme.cardRegister]} onPress={() => toggleModal(pokemon)}>
                <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text style={[theme.cardText2]}>{pokemonName}</Text>
                    {pokemon.type2 ?
                        <View style={[theme.typesContaner]}>
                            <Text style={[colorsByType(pokemon.type1), theme.cardText, { marginRight: -35 }]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                            <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                            <TouchableOpacity onPress={() => sendEmail()} style={{ alignSelf: "flex-end" }}>
                                <MaterialIcons name="email" size={30} color="#005C53" />
                            </TouchableOpacity>

                        </View>
                        :
                        <View style={theme.typesContaner}>
                            <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                            <TouchableOpacity onPress={() => sendEmail()} style={{ alignSelf: "flex-end" }}>
                                <MaterialIcons name="email" size={30} color="#005C53" />
                            </TouchableOpacity>
                        </View>

                    }
                </View>
                <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text style={theme.cardText}>Ability: {pokemon.ability.toUpperCase()}</Text>
                    <Text style={theme.cardText}>Nature:  {pokemon.Nature.name.toUpperCase()}</Text>
                    <Text style={theme.cardText}> Sex:  <AntDesign name={icone_sexo} size={16} color={icone_sexo == "M" ? "#58ABF6" : "#B33E66"} /></Text>


                </View>
                <Text style={theme.cardTextDate}>Date: {pokemon.updatedAt.split('-').join('/').slice(0, 10)}</Text>
                <Text style={theme.cardTextDate}>Owner: {pokemon.User.email}  {pokemon.User.name}</Text>

                {pokemon.shiny ?
                    <Image
                        style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                        source={{

                            uri: pokemonCapture.spriteShiny
                        }} />
                    :
                    <Image
                        style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                        source={{
                            uri: pokemonCapture.sprite
                        }} />
                }


            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible}>

                    <View style={[theme.modal, { height: "100%", borderRadius: 16 }]}>
                        <View style={[theme.modal, { backgroundColor: colorsByTypeTag(pokemon.type1), height: height * .40, borderRadius: 16 }]}>
                            <Text style={theme.PokemonIdModal}>#{pokemon.id}</Text>
                            {pokemon.shiny ?
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{

                                        uri: pokemonCapture.spriteShiny
                                    }} />
                                :
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{
                                        uri: pokemonCapture.sprite
                                    }} />
                            }
                        </View>
                        <Text style={[theme.PokemonNameModal]}>{pokemonName}</Text>
                        {pokemon.type2 ?
                            <View style={[theme.typesContaner, { paddingLeft: 100, paddingRight: 100 }]}>
                                <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                                <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                            </View>
                            :
                            <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                        }
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: "row", padding: 5, justifyContent: "space-between" }}>
                                <Text style={theme.PokemonDescriptionModal2}>Move 1:  {pokemon.move1}</Text>
                                <Text style={theme.PokemonDescriptionModal2}>Move 2:  {pokemon.move2}</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 5, justifyContent: "space-between" }}>
                                <Text style={theme.PokemonDescriptionModal2}>Move 3:  {pokemon.move3}</Text>
                                <Text style={theme.PokemonDescriptionModal2}>Move 4:  {pokemon.move4}</Text>
                            </View>
                            <Text style={theme.PokemonDescriptionModal2}>Ability: {pokemon.ability}</Text>
                            <Text style={theme.PokemonDescriptionModal2}>Shiny: {pokemon.shiny ? "Yes" : "No"}</Text>
                            <Text style={theme.PokemonDescriptionModal2}>Nature: {pokemon.Nature.name}</Text>
                            <Text style={theme.PokemonDescriptionModal2}>SEX:  <AntDesign name={icone_sexo} size={16} /></Text>
                            <Text style={theme.PokemonDescriptionModal2}>Date:  {pokemon.updatedAt.split('-').join('/').slice(0, 10)}</Text>

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <CustomButton label="Close" backgroundColor='#4C91B2' onPress={toggleModal} />
                        </View>
                    </View>
                </Modal>
            </View>
            <Modalize
                keyboardAvoidingBehavior='height'
                ref={modalRef}
                snapPoint={50}
                height={50}
                modalStyle={theme.modal}
            >
                <Text style={theme.email}>EMAIL ENVIADO COM SUCESSO</Text>
            </Modalize>
        </>
    )
}


export default CardPokemonRegister;
