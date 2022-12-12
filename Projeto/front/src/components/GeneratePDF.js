import React, { useContext } from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AppContext } from '../context/AppContext';

// import { Container } from './styles';

const GeneratePDF = (pokemon) => {
    const { username, password, id, age, sex } = useContext(AppContext);

    const html = `
    <html>
      <body>
        <h1>Hi ${username}</h1>
        <p style="color: red;">Hello</p>
        <p style="color: black;">Your List of Pokemons Registred</p>
        table border="1" style="width:100%">
        <tr>
            <th>Pokemon Name</th>
            <th>Shiny</th>
            <th>Nature</th>
            <th>Move 1</th>
            <th>Move 2</th>
            <th>Move 3</th>
            <th>Move 4</th>
        </tr>
        `
    pokemon.array.forEach(pokemon => {
        html += `<tr>
            <td>${pokemon.name}</td>
            <td>${pokemon.shiny}</td>
            <td>${pokemon.nature}</td>
            <td>${pokemon.move1}</td>
            <td>${pokemon.move2}</td>
            <td>${pokemon.move3}</td>
            <td>${pokemon.move4}</td>
        </tr> `
    });
    html += `</table>
        <H2>COPYRIGHT: POKEDEX FALLER</H2>
        </body>
        </html>`;

    console.log(html);

    let generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    };
    generatePdf();
    return(
            <View></View>
    )
    
}

export default GeneratePDF;