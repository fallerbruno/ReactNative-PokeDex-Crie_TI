import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
import { theme } from '../styles/Theme';
import Header from '../components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');


const ViewNav1 = (props) => {

  return (


    <View style={[theme.container, theme.conintanerblack, { flexDirection: 'row', flexWrap: 'wrap', }]}>
      
        <Header label="HOME" />
  
      <View style={{ padding: 16, flexDirection: "row", backgroundColor: "#91D8DF", width: width, marginBottom: 10, marginTop: 20 }} >
        <TouchableOpacity onPress={() => props.navigation.navigate("ViewDex")} style={theme.menuItens}>
          <MaterialCommunityIcons name="pokeball" size={50} color="black" />
          <Text style={theme.navtext}>POKEDEX</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16, flexDirection: "row", backgroundColor: "#FF6568", width: width, marginBottom: 10, marginTop: 10  }} >
        <TouchableOpacity onPress={() => props.navigation.navigate("ViewTrades")} style={[theme.menuItens,{backgroundColor: "#FF6568"}]}>
        <MaterialCommunityIcons name="atom-variant" size={50} color="black" />
          <Text style={theme.navtext}>TRADES</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16, flexDirection: "row", backgroundColor: "#8571BE", width: width, marginBottom: 10, marginTop: 10 }} >
        <TouchableOpacity onPress={() => props.navigation.navigate("ViewUsers")} style={[theme.menuItens,{backgroundColor: "#8571BE"}]}>
        <MaterialCommunityIcons name="account-group" size={50} color="black" />
          <Text style={theme.navtext}>USERS</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16, flexDirection: "row", backgroundColor: "#F78551", width: width, marginBottom: 10, marginTop: 10 }} >
      <TouchableOpacity onPress={() => props.navigation.navigate("ViewMyProfile")} style={[theme.menuItens,{backgroundColor: "#F78551"}]}>
      <MaterialCommunityIcons name="shield-account" size={50} color="black" />
        <Text style={theme.navtext}>MY PROFILE</Text>
      </TouchableOpacity>
      </View>
      <View style={{ padding: 16, flexDirection: "row", backgroundColor: "#8BBE8A", width: width, marginBottom: 10, marginTop: 10 }} >
      <TouchableOpacity onPress={() => props.navigation.navigate("ViewMessages")} style={[theme.menuItens,{backgroundColor: "#8BBE8A"}]}>
      <MaterialCommunityIcons name="message-processing" size={50} color="black" />
        <Text style={theme.navtext}>MESSAGES</Text>
      </TouchableOpacity>
      </View>
    </View>

  );
}

export default ViewNav1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});