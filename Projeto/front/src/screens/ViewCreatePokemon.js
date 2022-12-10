import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/Theme';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
const base64 = require('base-64');

const ViewCreatePokemon = ({ navigation, route }) => {
    const { username, password, id } = useContext(AppContext);
    const selectedPokemon = route.params.pokemon

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

    const [user, setUser] = useState({ initialStatus })
    const [shiny, setShiny] = useState();
    const [ability, setAbility] = useState();
    const [move1, setMove1] = useState();

console.log(user)
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
        <View>
            <Text style={theme.cardText}>
                Creating a : {initialStatus.name}
            </Text>
            <Text>Sex</Text>
            <ScrollView horizontal={true} >
                <TouchableOpacity onPress={() => setUser({ ...user, sex: "M" })}>
                    <Ionicons name="md-man-sharp" size={40} color={user.sex == "M" ? "blue" : "gray"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUser({ ...user, sex: "F" })}>
                    <Ionicons name="md-woman" size={40} color={user.sex == "F" ? "pink" : "gray"} />
                </TouchableOpacity>
            </ScrollView>
            <Text>Shiny</Text>
            <Picker
                mode='dropdown'
                selectedValue={shiny}
                onValueChange={[(value) => setAbility(value), (value) => setUser({ ...user, ability: value })]}>
                {
                    shinyOptions.map((item) => {
                        return <Picker.Item
                            key={item.value}
                            value={item.value}
                            label={item.name}
                        />
                    })
                }
            </Picker>
            <Text>Ability</Text>
            <Picker
                mode='dropdown'
                selectedValue={ability}
                onValueChange={[(value) => setShiny(value), (value) => setUser({ ...user, shiny: value })]}>
                {
                    abilityOption.map((item) => {
                        return <Picker.Item
                            key={item.value}
                            value={item.value}
                            label={item.name}
                        />
                    })
                }
            </Picker>
            <Text>Move 1</Text>
            {/* <Picker
                mode='dropdown'
                selectedValue={move}
                onValueChange={[(value) => setMove1(value), (value) => setUser({ ...user, move1: value })]}>
                {
                    moveCanUse.map((item) => {
                        return <Picker.Item
                            key={item.value}
                            value={item.value}
                            label={item.name}
                        />
                    })
                }
            </Picker> */}
        </View>
    )
}

export default ViewCreatePokemon