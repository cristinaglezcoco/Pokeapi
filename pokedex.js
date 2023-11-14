//función para hacer la pokedex con el input
const selectInput$$ = document.querySelector('#value-pokemon');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const selectBtn$$ = document.querySelector('#selectbtn');
selectBtn$$.addEventListener('click', selectPokemon);

async function selectPokemon(value) {
    let url = baseUrl + selectInput$$.value;
    try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            generatePokemon(result);
        } catch (error) {
            console.error(error);
        }
}

//funcion que genera el objeto de cada pokemon, con las propiedas que yo quiero
function generatePokemon (result) {
    const pokemonCard = {
        nombre: result.name,
        id: result.id,
        imagen: result.sprites['front_default'],
        habilidades: result.abilities.map(function(ability) {
            return ability.ability.name;
        }),
        tipo: result.types.map(function(type) {
            return type.type.name;
        })
    }
    
    paintPokemon(pokemonCard);
}


const eachPokemon$$ = document.querySelector('.eachPokemon');
//funcion que pinta los pokemons
function paintPokemon (pokemonCard) {

    eachPokemon$$.innerHTML = '';
    //los div son las tarjetas de cada pokemon
    const miDiv$$ = document.createElement('div');
    miDiv$$.classList.add('pokemonCard');
    
    const id$$ = document.createElement('p');
    if(pokemonCard.id < 10) {
        id$$.textContent = `#00${pokemonCard.id}`
    } else if(pokemonCard.id < 100) {
        id$$.textContent = `#0${pokemonCard.id}`
    } else {
        id$$.textContent = `#${pokemonCard.id}`
    }
    miDiv$$.appendChild(id$$);

    const img$$ = document.createElement('img');
    img$$.src = pokemonCard.imagen;
    img$$.alt = pokemonCard.nombre;
    miDiv$$.appendChild(img$$);

    const title$$ = document.createElement('h2');
    title$$.textContent = pokemonCard.nombre;
    miDiv$$.appendChild(title$$);

    const myTypesList$$ = document.createElement('ul');
    myTypesList$$.classList.add('typesList');
    miDiv$$.appendChild(myTypesList$$);

    pokemonCard.tipo.forEach(function(tipo) {
        const myType$$ = document.createElement('li');
        myType$$.textContent = `${tipo}`
        myTypesList$$.appendChild(myType$$);
    });

    const myAbilitiesList$$ = document.createElement('ul');
    myAbilitiesList$$.classList.add('abilitiesList');
    miDiv$$.appendChild(myAbilitiesList$$);
    
    pokemonCard.habilidades.forEach(function(habilidad) {
        const myAbility$$ = document.createElement('li');
        myAbility$$.textContent = `${habilidad}`
        myAbilitiesList$$.appendChild(myAbility$$);
    });

    eachPokemon$$.appendChild(miDiv$$);

}