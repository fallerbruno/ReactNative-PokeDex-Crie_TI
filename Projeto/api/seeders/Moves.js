const axios = require('axios');
const fetch = require('cross-fetch');
const base64 = require('base-64')

async function getAllPokemons() {

    let totalPokemons = await fetch(`https://pokeapi.co/api/v2/move`)
    totalPokemons = await totalPokemons.json();
    totalPokemons = totalPokemons.count;
    for (i = 1; i <= totalPokemons; i++) {

        const moves = await fetch(`https://pokeapi.co/api/v2/move/${i}`);
        const move = await moves.json()

        const accuracy = move.accuracy ? move.accuracy : null
        const power = move.power ? move.power : null

        const canLearn = await (move.learned_by_pokemon)
      
        canLearn.forEach((element) => {
        
                data = {
                    name: element.name,
                    MoveId: i,
                }

                axios('http://177.44.248.33:3000/pokemoncanusemove', {
                    method: 'post',
                    headers: {
                        'Authorization': 'Basic ' +
                            base64.encode('admin@admin.com' + ":" + 'admin')
                    },
                    data: data



                })
                    .then(function (response) {
                        console.log(data)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        });

        // axios('http://177.44.248.33:3000/moves', {
        //     method: 'post',
        //     headers: {
        //         'Authorization': 'Basic ' +
        //             base64.encode('admin@admin.com' + ":" + 'admin')
        //     },
        //     data: {
        //         name: move.name,
        //         description: move.flavor_text_entries[0].flavor_text,
        //         accuracy: accuracy,
        //         pp: move.pp,
        //         effect_chance: move.effect_chance,
        //         power: power,
        //         typeId: 1,
        //         element: move.type.name
        //     }

        // })
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
}
getAllPokemons();