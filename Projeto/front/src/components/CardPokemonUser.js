import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { theme } from '../styles/Theme';
import { colorsByType, colorsByTypeTag } from './CardPokemon';
import CustomButton from './CustomButton';
import { AppContext } from '../context/AppContext';
const base64 = require('base-64');
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
const { width, height } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';

// import { Container } from './styles';


const CardPokemonUser = (pokemon, render, props) => {
    const navigation = useNavigation();

    const { username, password } = useContext(AppContext);
    let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
    const [pokemona, setPokemona] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const icone_sexo = pokemon.sex == 'M' ? 'man' : 'woman';

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    function EditingPokemon(pokemon) {
       
        navigation.navigate("ViewEditingPokemon", {
            render: render,
            pokemon: pokemon,
        });
    }

    useEffect(() => {
        getPokemonforconsulte(pokemon);
    }, [])

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
            setPokemona(JJSOn);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }
    }




    async function DeletePokemon(id) {
        axios(`http://177.44.248.33:3000/pokemonsregister/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
        })
            .then(function (response) {
               render()

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (

        <>
            <View>
                <TouchableOpacity activeOpacity={0.6} style={[{ backgroundColor: colorsByTypeTag(pokemon.type1), minHeight: 250 }, theme.card, theme.shadows]} onPress={() => toggleModal()}>
                    <Text style={[theme.cardText]}>{pokemonName}</Text>
                    {pokemon.shiny ?
                        <Image
                            style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                            source={{

                                uri: pokemona.sprite
                            }} />
                        :
                        <Image
                            style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                            source={{
                                uri: pokemona.spriteShiny
                            }} />
                    }
                    {pokemon.type2 ?
                        <View style={theme.typesContaner}>
                            <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                            <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                        </View>
                        :
                        <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>

                    }
                    {/* <Text>Shiny: {pokemon.shiny}</Text>
                    <Text>Nature: {pokemon.Nature.name}</Text>
                    <Text>Ability: {pokemon.ability}</Text> */}

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => EditingPokemon(pokemon)}>
                            <FontAwesome name="edit" size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onLongPress={() => DeletePokemon(pokemon.id)}>
                            <FontAwesome name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible}>

                    <View style={theme.modal}>
                        <View style={[theme.modal, { backgroundColor: colorsByTypeTag(pokemon.type1), height: height * .40, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>
                            <Text style={theme.PokemonIdModal}>#{pokemon.id}</Text>
                            {pokemon.shiny ?
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{

                                        uri: pokemona.sprite
                                    }} />
                                :
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{
                                        uri: pokemona.spriteShiny
                                    }} />
                            }
                        </View>
                        <Text style={[theme.PokemonNameModal]}>{pokemonName}</Text>
                        {pokemon.type2 ?
                            <>
                                <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                                <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                            </>
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
                            <CustomButton label="Close" backgroundColor='white' onPress={toggleModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}


export default CardPokemonUser;
