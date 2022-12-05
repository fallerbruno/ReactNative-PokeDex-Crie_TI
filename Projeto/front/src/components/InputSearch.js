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

  async function SearchPokemon(search) {

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

  async function Clear() {
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
        style={theme.input}
      />
      <View style={theme.typesContaner}>
        <CustomButton
          label="Search"
          onPress={() => SearchPokemon(search)}
          backgroundColor="#bebebe"
          textColor="#000"
          width="40%" />
        <CustomButton
          label="Clear"
          onPress={() => Clear()}
          backgroundColor="#bebebe"
          textColor="#000"
          width="40%" />
      </View>
    </View >
  );
};

export default InputSearch;
