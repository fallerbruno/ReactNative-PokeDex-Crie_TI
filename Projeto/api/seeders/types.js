const axios = require('axios');
const fetch = require('cross-fetch');
const base64 = require('base-64')

async function getAllPokemons() {

    let totalPokemons = await fetch(`https://pokeapi.co/api/v2/type`)
    totalPokemons = await totalPokemons.json();
    totalPokemons = totalPokemons.count;
    for (i = 1; i <= totalPokemons; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${i}`)
        const json = await response.json();
        console.log(json)

        axios('http://localhost:3000/types', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: {
                name: json.names[7].name,
               
            }

        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
     }
}

getAllPokemons();