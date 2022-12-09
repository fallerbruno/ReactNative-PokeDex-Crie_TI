import React, { useState, useCallback, useContext, useEffect } from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native-animatable';
import { AppContext } from '../context/AppContext';
import { theme } from '../styles/Theme';
import CustomButton from './CustomButton';
const base64 = require('base-64');

const InputSearch = ({ value, setPokemon }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [search, setSearch] = useState({
    search: ""
  });
  const { username, password } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [SearchPokemon])

   const SearchPokemon = async (search) => {

    setLoading(true);

    let find = search.search.toLowerCase().trim()
    console.log(find);

    const response = await fetch(`http://177.44.248.33:3000/pokemons?name=${find}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' +
          base64.encode(username + ":" + password)
      }
    });
    const json = await response.json();
    setLoading(false);
    if (json) {
      console.log(json);
      setPokemon(json);
      setSearch('');
    } else {
      Alert.alert('Ops, deu ruim 😥', json.message);
     
    }
  }

  const Clear = async () =>{
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
      console.log(json);
      setPokemon(json);
 
    } else {
      Alert.alert('Ops, deu ruim 😥', json.message);
    }
  }


  return (
    <View isFocused={isFocused}>
      <TextInput
        placeholder={isFocused ? '' : 'Qual Pokémon você está procurando?'}
        value={search}
        onChangeText={(value) => setSearch({ ...search, search: value })}
        style={theme.inputModal}
      />
      <View style={theme.typesContaner}>
        <CustomButton
          label="Search"
          onPress={() => SearchPokemon(search)}
          backgroundColor="#06FF73"
          textColor="#000"
          width="48%" />
        <CustomButton
          label="Clear"
          onPress={() => Clear()}
          backgroundColor="#02A2E6"
          textColor="#000"
          width="48%" />
      </View>
    </View >
  );
};

export default InputSearch;