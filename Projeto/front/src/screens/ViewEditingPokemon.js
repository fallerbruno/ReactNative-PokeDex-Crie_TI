import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/Theme';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
import CustomButton from '../components/CustomButton';
import axios from 'axios'
import { colorsByType, colorsByTypeTag } from '../components/CardPokemon';
import { FontAwesome } from '@expo/vector-icons';

const base64 = require('base-64');

const { width, height } = Dimensions.get('window');

const ViewEditingPokemon = ({ navigation, route }) => {

    const pokemon = route.params.pokemon
    
    const { username, password, id } = useContext(AppContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)

    const [listmoves, setListMoves] = useState([]);
    const [shiny, setShiny] = useState(pokemon.shiny);
    const [sex, setSex] = useState(pokemon.sex);
    const [ability, setAbility] = useState();
    const [hidden, setHidden] = useState();
    const [normal, setNormal] = useState()
    const [move1, setMove1] = useState(pokemon.move1);
    const [move2, setMove2] = useState(pokemon.move2);
    const [move3, setMove3] = useState(pokemon.move3);
    const [move4, setMove4] = useState(pokemon.move4);
    const [natureList, setNatureList] = useState([]);
    const [nature, setNature] = useState(pokemon.NatureId);


    const initialStatus = {
        name: pokemon.name,
        description: pokemon.description,
        sex: pokemon.sex,
        shiny: pokemon.shiny,
        type1: pokemon.type1,
        type2: pokemon.type2,
        species: pokemon.species,
        ability: pokemon.abilty,
        move1: pokemon.move1,
        move2: pokemon.move2,
        move3: pokemon.move3,
        move4: pokemon.move4,
        hp: pokemon.hp,
        atk: pokemon.atk,
        spatk: pokemon.spatk,
        def: pokemon.def,
        spdef: pokemon.spdef,
        speed: pokemon.speed,
        natureId: pokemon.NatureId,
        userId: pokemon.UserId,
    }

    async function EditPokemon() {
        const data = {
            name: pokemon.name,
            description: pokemon.description,
            sex: sex,
            shiny: shiny,
            type1: pokemon.type1,
            type2: pokemon.type2,
            species: pokemon.species,
            ability: ability,
            move1: move1,
            move2: move2,
            move3: move3,
            move4: move4,
            hp: pokemon.hp,
            atk: pokemon.atk,
            spatk: pokemon.spatk,
            def: pokemon.def,
            spdef: pokemon.spdef,
            speed: pokemon.speed,
            NatureId: nature,
            UserId: id,
        }
        console.log(data)
        axios(`http://177.44.248.33:3000/pokemonsregister/${pokemon.id}`, {
            method: 'put',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: data

        })
            .then(function (response) {
                
                navigation.navigate("ViewMyProfile", {
                    refresh : true
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        PokemonFullStatus();
    }, [])

    async function PokemonFullStatus() {

        const response = await fetch(`http://177.44.248.33:3000/pokemons?name=${initialStatus.name}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        if (json) {
            setHidden(json[0].abilityHidden)
            setNormal(json[0].abilityNormal)
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }

    const abilityOption = [

        {
            value: hidden,
            name: hidden
        },
        {
            value: normal,
            name: normal
        }
    ]

  
    const shinyOptions = [
        {
            value: true,
            name: "True"
        },
        {
            value: false,
            name: "False"
        },
    ];


    useEffect(() => {
        listMoves();
    }, [])

    async function listMoves() {

        const response = await fetch(`http://177.44.248.33:3000/pokemoncanusemove?name=${initialStatus.name}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        if (json) {
            setListMoves(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

    }

    useEffect(() => {
        listNature();
    }, [])

    async function listNature() {
        const response = await fetch(`http://177.44.248.33:3000/natures`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            }
        });
        const json = await response.json();
        if (json) {
            setNatureList(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }
    }


    return (

        <>
            <View style={theme.modal2}>
                <Text style={[theme.titleWhite, { marginTop: 10 }]} >
                    Editing a : {pokemon.name}
                </Text>
                <Text style={theme.labelWhite} >Sex</Text>
                <ScrollView horizontal={true} >
                    <TouchableOpacity onPress={() => setSex("M")}>
                        <Ionicons name="md-male-sharp" size={40} color={sex == "M" ? "blue" : "gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSex("F")}>
                        <Ionicons name="md-female-sharp" size={40} color={sex == "F" ? "pink" : "gray"} />
                    </TouchableOpacity>
                </ScrollView>
                <Text style={theme.labelWhite} >Shiny</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={shiny}
                    onValueChange={(value) => setShiny(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        shinyOptions.map((item) => {
                            return <Picker.Item
                                key={item.value}
                                value={item.value}
                                label={item.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite} >Ability</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={ability}
                    onValueChange={(value) => setAbility(value)}
                    dropdownIconColor={"#91D8DF"}
                >
                    {
                        abilityOption.map((item) => {
                            return <Picker.Item
                                key={item.value}
                                value={item.value}
                                label={item.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite} >Move 1</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={move1}
                    onValueChange={(value) => setMove1(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        listmoves.map((item) => {
                            return <Picker.Item
                                key={item.MoveId}
                                value={item.Move.name}
                                label={item.Move.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite}>Move 2</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={move2}
                    onValueChange={(value) => setMove2(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        listmoves.map((item) => {
                            return <Picker.Item
                                key={item.MoveId}
                                value={item.Move.name}
                                label={item.Move.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite}>Move 3</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={move3}
                    onValueChange={(value) => setMove3(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        listmoves.map((item) => {
                            return <Picker.Item
                                key={item.MoveId}
                                value={item.Move.name}
                                label={item.Move.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite}>Move 4</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={move4}
                    onValueChange={(value) => setMove4(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        listmoves.map((item) => {
                            return <Picker.Item
                                key={item.MoveId}
                                value={item.Move.name}
                                label={item.Move.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>
                <Text style={theme.labelWhite}>Nature</Text>
                <Picker
                    mode='dropdown'
                    selectedValue={nature}
                    onValueChange={(value) => setNature(value)}
                    dropdownIconColor={"#91D8DF"}>
                    {
                        natureList.map((item) => {
                            return <Picker.Item
                                key={item.id}
                                value={item.id}
                                label={item.name}
                                style={theme.labelWhite}
                                color={"#59A805"}
                            />
                        })
                    }
                </Picker>

                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <CustomButton width="48%" label="Close" backgroundColor='#FF4755' onPress={() => navigation.navigate("ViewMyProfile")} />
                    <CustomButton width="48%" label="Finish Editing" backgroundColor='#58ABF6' onPress={() => EditPokemon()} />
                </View>
            </View>


        </>
    )
}

export default ViewEditingPokemon