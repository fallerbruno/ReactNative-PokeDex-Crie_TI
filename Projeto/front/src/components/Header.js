import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { colors, theme } from '../styles/Theme';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const Header = ({ label }) => {
    const navigation = useNavigation();

    function logout(){
        navigation.reset({
            index: 0,
            routes: [{ name: "ViewNewLogin" }]})
    }

    function back() {
        navigation.goBack()
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewNav1')} activeOpacity={0.6}>
                <FontAwesome name="home" size={60} color="#FFEF82" />
            </TouchableOpacity>
            <Text style={theme.titleWhite}> {label} </Text>
            <View style={{justifyContent: "space-around"}}>
           
            <TouchableOpacity onPress={back} activeOpacity={0.6}>
                <FontAwesome name="arrow-right" size={60} color="#E281EB" />
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 100,
        width: "100%",
        paddingHorizontal: 8,
        backgroundColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        zIndex: 100,
    },
    logout: {
        flex: 1,
        width: 80,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})