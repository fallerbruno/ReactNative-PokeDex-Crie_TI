import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
//import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";
import { AppContext } from '../context/AppContext';
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

    const [pokemonCapture, setPokemonCapture] = useState([]);
    const { username, password } = useContext(AppContext);
    const icone_sexo = pokemon.sex == 'M' ? 'man' : 'woman';

    useEffect(() => {
        getPokemonforconsulte(pokemon);
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);



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
                        <View style={theme.typesContaner}>
                            <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                            <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                        </View>
                        :
                        <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                    }
                </View>
                <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text style={theme.cardText}>{pokemon.ability}</Text>
                    <Text style={theme.cardText}>Nature</Text>
                    <Text style={theme.cardText}> SEX:<AntDesign name={icone_sexo} size={16} /></Text>
                    <Text style={theme.cardText}>Date: {pokemon.updatedAt.split('-').join('/').slice(0, 10)}</Text>

                </View>
                {pokemon.shiny ?
                    <Image
                        style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                        source={{

                            uri: pokemonCapture.sprite
                        }} />
                    :
                    <Image
                        style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                        source={{
                            uri: pokemonCapture.spriteShiny
                        }} />
                }


            </TouchableOpacity>
           
            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible}>

                    <View style={theme.modal}>
                        <View style={[theme.modal, { backgroundColor: colorsByTypeTag(pokemon.type1), height: height * .40, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>
                            <Text style={theme.PokemonIdModal}>#{pokemon.id}</Text>
                            {pokemon.shiny ?
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{

                                        uri: pokemonCapture.sprite
                                    }} />
                                :
                                <Image
                                    style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                    source={{
                                        uri: pokemonCapture.spriteShiny
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
                        <View style={{padding: 10}}>
                        <View style={{flexDirection: "row", padding: 5, justifyContent: "space-between" }}>
                        <Text style={theme.PokemonDescriptionModal2}>Move 1:  {pokemon.move1}</Text>
                        <Text style={theme.PokemonDescriptionModal2}>Move 2:  {pokemon.move2}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 5, justifyContent: "space-between" }}>
                        <Text style={theme.PokemonDescriptionModal2}>Move 3:  {pokemon.move3}</Text>
                        <Text style={theme.PokemonDescriptionModal2}>Move 4:  {pokemon.move4}</Text>
                        </View>
                        <Text style={theme.PokemonDescriptionModal2}>Ability: {pokemon.ability}</Text>
                        <Text style={theme.PokemonDescriptionModal2}>Shiny: {pokemon.shiny ? "Yes" : "No"}</Text>
                        <Text style={theme.PokemonDescriptionModal2}>Nature:{pokemon.nature}</Text>
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


export default CardPokemonRegister;
