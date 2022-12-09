import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
import { theme } from '../styles/Theme';

const { width, height } = Dimensions.get('window');


const ViewNav1 = (props) => {
  
  return (
    <View style={[theme.container, theme.conintanerblack,{flexDirection: 'row', flexWrap: 'wrap'}]}>
      <View style={{width: width*.48, padding: 16}} >
        <TouchableOpacity onPress={() =>props.navigation.navigate("ViewDex")}>

          <Image
            style={{ width: 150, height: 150 }}
            resizeMode='contain'
            source={require('../assets/masterball.png')} />
          <Text style={theme.navtext}>POKEDEX</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: width*.48, padding: 16}} >
        <TouchableOpacity onPress={() =>props.navigation.navigate("ViewTrades")}>
          <Image
            style={{ width: 150, height: 150 }}
            resizeMode='contain'
            source={require('../assets/masterball.png')} />
          <Text style={theme.navtext}>TRADES</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: width*.48, padding: 16}} >
        <TouchableOpacity onPress={() =>props.navigation.navigate("ViewUsers")}>
          <Image
            style={{ width: 150, height: 150 }}
            resizeMode='contain'
            source={require('../assets/masterball.png')} />
          <Text style={theme.navtext}>USERS</Text>
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