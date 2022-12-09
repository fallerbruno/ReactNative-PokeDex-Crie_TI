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
const base64 = require('base-64');
// import { Container } from './styles';

const ViewDex = () => {
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const { username, password } = useContext(AppContext);
    
    console.log('CREDENTIALS=>', username);

    //modalize

    const modalRef = useRef(null)

    function onOpenModal() {

        if (modalRef != null) {

            modalRef.current?.open();
        }
    }

    function onCloseModal() {
        modalRef.current?.close()
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
                    keyboardAvoidingBehavior='height'
                    ref={modalRef}
                    snapPoint={200}
                    height={200}
                    modalStyle={theme.modal}
                >
                    <InputSearch setPokemon={setPokemon} />
                </Modalize>
            </View>




        </>
    )
}

export default ViewDex;
