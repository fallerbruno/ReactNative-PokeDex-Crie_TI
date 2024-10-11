const axios = require('axios');
const fetch = require('cross-fetch');
const base64 = require('base-64')

async function getAllPokemons() {

    axios('http://localhost:3000/pokemonsregister', {
        method: 'post',
        headers: {
            'Authorization': 'Basic ' +
                base64.encode('admin@admin.com' + ":" + 'admin')
        },
        data: {
            name: "Charmander",
            description: "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
            sex: "M",
            shiny: false,
            type1: "grass",
            type2: null,
            species: "bulbasaur",
            ability: "chlorophyll",
            move1: "move1",
            move2: "move2",
            move3: "move3",
            move4: "move4",
            hp: 45,
            atk: 49,
            spatk: 49,
            def: 65,
            spdef: 65,
            speed: 45,
            natureId: 1,
            userId: 1
        }

    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}

getAllPokemons();


