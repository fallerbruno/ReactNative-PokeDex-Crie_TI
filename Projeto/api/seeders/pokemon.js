const axios = require('axios');
const fetch = require('cross-fetch');
const base64 = require('base-64')

async function getAllPokemons() {

    let totalPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    totalPokemons = await totalPokemons.json();
    totalPokemons = totalPokemons.count;
    for (i = 1; i <= totalPokemons; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const json = await response.json();

        const description = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
        const descrip = await description.json()

        const type2 = json.types[1] ? json.types[1].type.name : null
        const ability2 = json.abilities[1] ? json.abilities[1].ability.name : ""

        axios('http://localhost:3000/pokemons', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode('admin@admin.com' + ":" + 'admin')
            },
            data: {
                name: json.forms[0].name,
                description: descrip.flavor_text_entries[0].flavor_text,
                type1: json.types[0].type.name,
                type2: type2,
                species: json.species.name,
                sprite: json.sprites.front_default,
                spriteShiny: json.sprites.front_shiny,
                abilityHidden: ability2,
                abilityNormal: json.abilities[0].ability.name,
                hp: json.stats[0].base_stat,
                atk: json.stats[1].base_stat,
                spatk: json.stats[2].base_stat,
                def: json.stats[3].base_stat,
                spdef: json.stats[4].base_stat,
                speed: json.stats[5].base_stat,
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