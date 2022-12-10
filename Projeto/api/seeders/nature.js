const axios = require('axios');
const fetch = require('cross-fetch');
const base64 = require('base-64')

async function getAllPokemons() {

    let totalPokemons = await fetch(`https://pokeapi.co/api/v2/nature`)
    totalPokemons = await totalPokemons.json();
    totalPokemons = totalPokemons.count;
    for (i = 1; i <= totalPokemons; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/nature/${i}`)
        const json = await response.json()
        const up = json.increased_stat ?  json.increased_stat.name : null
        const down = json.decreased_stat ? json.decreased_stat.name : null
        axios('http://177.44.248.33:3000/natures', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: {
                name: json.name,
                statusUp: up,
                statusDown: down
             
            }

        })
            .then(function (response) {
                console.log(data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

getAllPokemons();