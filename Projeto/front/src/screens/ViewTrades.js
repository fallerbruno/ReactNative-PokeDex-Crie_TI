import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppContext } from '../context/AppContext';
import { theme } from '../styles/Theme';
import CardPokemonRegister from '../components/CardPokemonRegister';
import FloatingButton from '../components/FloatingButton';
import InputSearch from '../components/InputSearch';
import CustomButton from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Header from '../components/Header';

const base64 = require('base-64');
// import { Container } from './styles';

const ViewTrades = (props) => {
    const { width, height } = Dimensions.get('window');
    const [pokemon, setPokemon] = useState([]);
    const [pokemonRegister, setPokemonRegister] = useState([]);
    const { username, password, id } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    console.log('CREDENTIALS=>', username);

    //modalize

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    //efect para renderizar eles na tela
    useEffect(() => {
        ListPokemonsRegister();
    }, [])

    async function ListPokemonsRegister() {

        //console.log('CREDENTIALS=>', _username, _password);

        const response = await fetch('http://177.44.248.33:3000/pokemonsregister', {
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



    useEffect(() => {
        ListPokemons();
    }, [])

    async function ListPokemons() {

        const response = await fetch('http://177.44.248.33:3000/pokemons', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        if (json) {
            setPokemonRegister(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }


    //aumenta a perfomace de renderizacao
    function RenderItem({ item }) {
        return <CardPokemonRegister {...item} />
    }

    function RenderList({ item }) {
        let pokemonName = item.name[0].toUpperCase() + item.name.substring(1)
        return (
            <TouchableOpacity onPress={() => CreatePokemon(item)}>
                <Text style={[theme.cardText, { borderWidth: 1, borderRadius: 16, padding: 10, margin: 15, borderColor: "#005C53", backgroundColor: "#027373", color: "white" }]}>{pokemonName}</Text>
            </TouchableOpacity>
        )
    }

    function CreatePokemon(pokemon) {
        props.navigation.navigate("ViewCreatePokemon", {
            pokemon: pokemon,
        });
    }

    return (
        <>

            <Header label="TRADES" />
            <View style={[theme.container, theme.conintanerblack]}>
                <FlatList
                    //ListHeaderComponent={}
                    //ItemSeparatorComponent={}
                    data={pokemon}
                    onRefresh={() => ListPokemonsRegister()}
                    refreshing={loading}
                    keyExtractor={item => item.id}
                    renderItem={RenderItem}
                    numColumns={1}

                />
                <FloatingButton onPress={() => toggleModal()} />
                <Modal
                    keyboardAvoidingBehavior='height'
                    visible={isModalVisible}
                    style={{ backgroundColor: "#5FCDD9" }}
                >
                    <View style={theme.modal2}>
                        <TouchableOpacity
                            onPress={() => toggleModal()}
                            style={{ alignSelf: "flex-end", margin: 10 }}
                        >
                            <AntDesign name="closecircle" size={30} color="red" style={{}} />
                        </TouchableOpacity>
                        <InputSearch setPokemon={setPokemonRegister} />
                        <Text style={theme.PokemonNameModal}>SELECT A POKEMON TO CREATE</Text>
                        <FlatList
                            //ListHeaderComponent={}
                            //ItemSeparatorComponent={}
                            data={pokemonRegister}
                            keyExtractor={item => item.id}
                            renderItem={RenderList}
                            numColumns={3}
                        />
                    </View>

                </Modal>
            </View>




        </>
    )
}

export default ViewTrades;
