import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export const theme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#555',
        height: 42,
        borderRadius: 8,
        width: '100%',
        marginBottom: 16,
        paddingLeft: 8,
        fontFamily: "Ubuntu_400Regular",
    },
    button: {
        backgroundColor: '#333',
        height: 48,
        marginTop: 16,
        borderRadius: 8,
        padding: 8,
    },
    textButton: {
        color: '#9400d3',
        fontSize: 24,
        fontFamily: "Ubuntu_700Bold",
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontFamily: "Ubuntu_400Regular"
    },
    title: {
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        textAlign: "center"
    },
    shadows: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5
    },
    modal: {
        flex: 1,
        backgroundColor: "#333",
        alignContent: "center",
        justifyContent: "center",
        fontFamily: " Ubuntu_700Bold",
        textAlign: 'center',
        padding: 16
    },
    containerNormal: {

        backgroundColor: '#A8A77A',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
        
    },
    containerEletric: {

        backgroundColor: '#F7D02C',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerfire: {

        backgroundColor: '#FF4755',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        width: 75,
        alignSelf: "center"
    },
    containerWater: {

        backgroundColor: '#6390F0',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerGrass: {

        backgroundColor: '#62B957',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerIce: {

        backgroundColor: '#61CEC0',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerGrass: {

        backgroundColor: '#96D9D6',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },

    containerFighting: {

        backgroundColor: '#C22E28',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerPoison: {

        backgroundColor: '#AF59FF',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },

    containerGround: {

        backgroundColor: '#E2BF65',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerFlying: {

        backgroundColor: '#A98FF3',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerPsychic: {

        backgroundColor: '#E281EB',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerBug: {

        backgroundColor: '#A6B91A',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerRock: {

        backgroundColor: '#B6A136',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerGhost: {

        backgroundColor: '#735797',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerDragon: {

        backgroundColor: '#6F35FC',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerDark: {

        backgroundColor: '#705746',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerSteel: {

        backgroundColor: '#B7B7CE',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    containerFairy: {
        backgroundColor: '#D685AD',
        borderRadius: 16,
        marginTop: 5,
        padding: 5,
        width: 75,
        alignSelf: "center"
    },
    card: {
        position: 'relative',
        borderRadius: 6,
        width: width * .47,
        justifyContent: "space-around",
        margin: 6,
        padding: 8,
    },
    cardText: {
        fontSize: 15,
        fontFamily: "Ubuntu_700Bold",
        textAlign: "center",
        color: "black",
        padding: 5
    },
    modal: {
        backgroundColor: '#333',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
    },
    typesContaner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 8
    },
    conintanerblack:{
        backgroundColor: '#333'
    },
    PokemonNameModal: {
        fontSize: 24,
        fontFamily: "Ubuntu_700Bold",
        textAlign: "center",
        color: "white",
        padding: 10
    },
    PokemonIdModal: {
        fontSize: 24,
        fontFamily: "Ubuntu_700Bold",
        color: "white",
        padding: 10,
        alignSelf: "flex-end"
    },
    PokemonTextModal:{
        fontSize: 16,
        fontFamily: "Ubuntu_700Bold",
        color: "white",
        textAlign: 'center',
        marginTop: 5
    },
    PokemonDescriptionModal:{
        fontSize: 12,
        fontFamily: "Ubuntu_700Bold",
        color: "white",
        marginTop: 5,
        padding: 10
    }



});