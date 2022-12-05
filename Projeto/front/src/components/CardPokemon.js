import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
//import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";

import { theme } from '../styles/Theme';
import CustomButton from './CustomButton';


const { width, height } = Dimensions.get('window');

// import { Container } from './styles';

const CardPokemon = (pokemon) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
    const description = pokemon.description.replace(/(\r\n|\n|\r)/gm, "");
    return (
        <>
       
            <TouchableOpacity activeOpacity={0.6} style={[{ backgroundColor: colorsByTypeTag(pokemon.type1) }, theme.card, theme.shadows]} onPress={() => toggleModal(pokemon)}>
                <Image
                    style={{ width: width * .3, height: height * .12, alignSelf: "center", backgroundColor: colorsByTypeTag(pokemon.type1), borderRadius: 16, marginTop: 12 }}
                    source={{
                        uri: pokemon.sprite
                    }} />
                <Text style={[theme.cardText]}>{pokemonName}</Text>
                {pokemon.type2 ?
                    <View style={theme.typesContaner}>
                        <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                        <Text style={[colorsByType(pokemon.type2), theme.cardText]}>{pokemon.type2[0].toUpperCase() + pokemon.type2.substring(1)}</Text>
                    </View>
                    :
                    <Text style={[colorsByType(pokemon.type1), theme.cardText]}>{pokemon.type1[0].toUpperCase() + pokemon.type1.substring(1)}</Text>
                }
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible}>

                    <View style={theme.modal}>
                        <View style={[theme.modal, { backgroundColor: colorsByTypeTag(pokemon.type1), height: height * .40, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>
                            <Text style={theme.PokemonIdModal}>#{pokemon.id}</Text>
                            <Image
                                style={{ width: width * .75, height: height * .35, alignSelf: "center" }}
                                source={{
                                    uri: pokemon.sprite
                                }} />
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
                        <Text style={theme.PokemonDescriptionModal}>Description: {description}</Text>
                        
                        <View style={{alignItems: 'center'}}>
                        <CustomButton label="Close" backgroundColor='white' onPress={toggleModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}


export default CardPokemon;


export function colorsByType(type) {
    switch (type) {
        case 'normal':
            return theme.containerNormal;
        case 'fire':
            return theme.containerfire
        case 'water':
            return theme.containerWater
        case 'electric':
            return theme.containerEletric
        case 'grass':
            return theme.containerGrass
        case 'ice':
            return theme.containerIce
        case 'fighting':
            return theme.containerFighting
        case 'poison':
            return theme.containerPoison
        case 'ground':
            return theme.containerGround
        case 'flying':
            return theme.containerFlying
        case 'psychic':
            return theme.containerPsychic
        case 'bug':
            return theme.containerBug
        case 'rock':
            return theme.containerRock
        case 'ghost':
            return theme.containerGhost
        case 'dragon':
            return theme.containerDragon
        case 'dark':
            return theme.containerDark
        case 'steel':
            return theme.containerSteel
        case 'fairy':
            return theme.containerFairy
        default:
    }

}

export function colorsByTypeTag(type) {
    switch (type) {
        case 'normal':
            return '#B5B9C4'
        case 'fire':
            return '#FFA756'
        case 'water':
            return '#58ABF6'
        case 'electric':
            return '#FFEF82'
        case 'grass':
            return '#8BBE8A'
        case 'ice':
            return '#91D8DF'
        case 'fighting':
            return '#83A2E3'
        case 'poison':
            return '#9F6E97'
        case 'ground':
            return '#F78551'
        case 'flying':
            return '#83A2E3'
        case 'psychic':
            return '#FF6568'
        case 'bug':
            return '#8BD674'
        case 'rock':
            return '#D4C294'
        case 'ghost':
            return '#8571BE'
        case 'dragon':
            return '#7383B9'
        case 'dark':
            return '#6F6E78'
        case 'steel':
            return '#4C91B2'
        case 'fairy':
            return '#EBA8C3'
        default:
    }

}