import React, { useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CardPokemon from '../components/CardPokemon';
import FloatingButtonSearch from '../components/FloatingButtonSearch';
import InputSearch from '../components/InputSearch';
import { AppContext } from '../context/AppContext';
import { theme } from '../styles/Theme';
import { Modalize } from 'react-native-modalize';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import RnGH from 'react-native-gesture-handler';
import Header from '../components/Header';
const base64 = require('base-64');
// import { Container } from './styles';

const ViewDex = () => {
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const { username, password } = useContext(AppContext);

    console.log('CREDENTIALS=>', username);

    //modalize

    const modalA = useRef(null);
    const [modalAOpen, setModalAOpen] = useState(false);

    function onOpenModal() {

        if (modalAOpen) {
            modalA.current?.close();
        } else {
            modalA.current?.open();
        }
    }

    //efect para renderizar eles na tela
    useEffect(() => {
        ListPokemons();
    }, [])

    async function ListPokemons() {

        setLoading(true);

        //console.log('CREDENTIALS=>', _username, _password);

        const response = await fetch('http://177.44.248.33:3000/pokemons', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        setLoading(false);
        if (json) {
            setPokemon(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }


    //aumenta a perfomace de renderizacao
    function RenderItem({ item }) {
        return <CardPokemon {...item} />
    }

    return (
        <>

            <Header label="POKEDEX" />
            <View style={[theme.container, theme.conintanerblack]}>
                <FlatList
                    //ListHeaderComponent={}
                    //ItemSeparatorComponent={}
                    data={pokemon}
                    keyExtractor={item => item.id}
                    renderItem={RenderItem}
                    numColumns={2}
                />
                <FloatingButtonSearch onPress={onOpenModal} />
                <Modalize
                    ref={modalA}
                    onOpen={() => setModalAOpen(true)}
                    onClose={() => setModalAOpen(false)}
                    keyboardAvoidingBehavior='height'

                    snapPoint={180}
                    height={180}
                    modalStyle={[theme.modal, { paddingTop: 20 }]}
                >
                    <InputSearch setPokemon={setPokemon} onOpenModal={() => onOpenModal()} />
                </Modalize>
            </View>




        </>
    )
}

export default ViewDex;
