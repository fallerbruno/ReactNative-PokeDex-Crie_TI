import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/Theme';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
import CustomButton from '../components/CustomButton';
import axios from 'axios'
const base64 = require('base-64');

const { width, height } = Dimensions.get('window');

const ViewCreatePokemon = ({ navigation, route }) => {
    const { username, password, id } = useContext(AppContext);
    const selectedPokemon = route.params.pokemon
    const [pokemon, setPokemon] = useState([]);
    const [listmoves, setListMoves] = useState([]);
    const [user, setUser] = useState({ initialStatus })
    const [shiny, setShiny] = useState();
    const [sex, setSex] = useState();
    const [ability, setAbility] = useState();
    const [move1, setMove1] = useState();
    const [move2, setMove2] = useState();
    const [move3, setMove3] = useState();
    const [move4, setMove4] = useState();
    const [natureList, setNatureList] = useState([]);
    const [nature, setNature] = useState();
    const select  = "select a value"
    const initialStatus = {
        name: selectedPokemon.name,
        description: selectedPokemon.description,
        sex: "",
        shiny: false,
        type1: selectedPokemon.type1,
        type2: selectedPokemon.type2,
        species: selectedPokemon.species,
        ability: "",
        move1: "",
        move2: "",
        move3: "",
        move4: "",
        hp: selectedPokemon.hp,
        atk: selectedPokemon.atk,
        spatk: selectedPokemon.spatk,
        def: selectedPokemon.def,
        spdef: selectedPokemon.spdef,
        speed: selectedPokemon.speed,
        natureId: 0,
        userId: id,
        
    }

    async function RegisterNewPokemon() {
        const data = {
            name: selectedPokemon.name,
            description: selectedPokemon.description,
            sex: sex,
            shiny: shiny,
            type1: selectedPokemon.type1,
            type2: selectedPokemon.type2,
            species: selectedPokemon.species,
            ability: ability,
            move1: move1,
            move2: move2,
            move3: move3,
            move4: move4,
            hp: selectedPokemon.hp,
            atk: selectedPokemon.atk,
            spatk: selectedPokemon.spatk,
            def: selectedPokemon.def,
            spdef: selectedPokemon.spdef,
            speed: selectedPokemon.speed,
            NatureId: nature,
            UserId: id,
        }
        console.log(data)
        axios('http://177.44.248.33:3000/pokemonsregister', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: data

        })
            .then(function (response) {
                navigation.navigate("ViewMyProfile")

            })
            .catch(function (error) {
                console.log(error);
            });
    }


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

    const abilityOption = [
        {
            value: selectedPokemon.abilityHidden,
            name: selectedPokemon.abilityHidden
        },
        {
            value: selectedPokemon.abilityNormal,
            name: selectedPokemon.abilityNormal
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

    return (
        <View style={theme.modal2}>
            <Text style={[theme.titleWhite, {marginTop: 10}]}>
                Creating a : {initialStatus.name[0].toUpperCase() + initialStatus.name.substring(1)}
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
                dropdownIconColor={"#91D8DF"}
                >
                 <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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

                     <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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
                     <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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
            <Text style={theme.labelWhite} >Move 2</Text>
            <Picker
                mode='dropdown'
                selectedValue={move2}
                onValueChange={(value) => setMove2(value)}
                dropdownIconColor={"#91D8DF"}>
                     <Picker.Item label="Select a Value" enabled={false}   style={theme.labelWhite} color={'#91D8DF'}/>
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
            <Text style={theme.labelWhite} >Move 3</Text>
            <Picker
                mode='dropdown'
                selectedValue={move3}
                onValueChange={(value) => setMove3(value)}
                dropdownIconColor={"#91D8DF"}>
                     <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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
            <Text style={theme.labelWhite} >Move 4</Text>
            
            <Picker
                mode='dropdown'
                selectedValue={move4}
                onValueChange={(value) => setMove4(value)}
                dropdownIconColor={"#91D8DF"}>
                     <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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
            <Text style={theme.labelWhite} >Nature</Text>
            <Picker
                mode='dropdown'
                selectedValue={nature}
                onValueChange={(value) => setNature(value)}
                dropdownIconColor={"#91D8DF"}>
                     <Picker.Item label="Select a Value" enabled={false}  style={theme.labelWhite} color={'#91D8DF'} />
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
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <CustomButton label="Register" width="48%" backgroundColor={'#58ABF6'} onPress={() => RegisterNewPokemon()} />
            <CustomButton label="Cancel" width="48%" backgroundColor={'#FFA756'} onPress={() => navigation.navigate("ViewNav1")} />
            </View>
        </View>
    )
}

export default ViewCreatePokemon