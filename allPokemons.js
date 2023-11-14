const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; 
const numberOfPokemon = 150;
const pokemonList$$ = document.querySelector('#allPokemons');
const showbtn$$ = document.querySelector('.showPokemon')

//funcion que coge la api
async function getApi () {
    
    pokemonList$$.innerHTML ='';
    
    for (let i = 0; i < numberOfPokemon; i++) {
        const url = baseUrl + (i + 1);
    
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            generatePokemon(result);
        } catch (error) {
            console.error(error);
        }
    };

}

//funcion que genera el objeto de cada pokemon, con las propiedas que yo quiero
function generatePokemon (result) {
    const pokemonCard = {
        nombre: result.name,
        imagen: result.sprites['front_default'],
        id: result.id,
        habilidades: result.abilities.map(function(ability) {
            return ability.ability.name;
        }),
        tipo: result.types.map(function(type) {
            return type.type.name;
        })
    }
    
    paintPokemon(pokemonCard);
    //console.log(pokemonCard);
}

//funcion que pinta los pokemons
function paintPokemon (pokemonCard) {
    //los div son las tarjetas de cada pokemon
    const miDiv$$ = document.createElement('div');
    miDiv$$.classList.add('pokemon');

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
    miDiv$$.appendChild(img$$);

    const img1$$ = document.createElement('img');
    img1$$.classList.add('cardpokeball');
    img1$$.src = './assets/pokeball.png';
    miDiv$$.appendChild(img1$$);

    const title$$ = document.createElement('h2');
    title$$.textContent = pokemonCard.nombre;
    miDiv$$.appendChild(title$$);

    const myList$$ = document.createElement('ul');
    miDiv$$.appendChild(myList$$);

    pokemonCard.tipo.forEach(function(tipo) {
        const myType$$ = document.createElement('li');
        myType$$.textContent = `Tipo: ${tipo}`
        myList$$.appendChild(myType$$);
    });
    
    pokemonCard.habilidades.forEach(function(habilidad) {
        const myAbility$$ = document.createElement('li');
        myAbility$$.textContent = `Habilidad: ${habilidad}`
        myList$$.appendChild(myAbility$$);
    });

    pokemonList$$.appendChild(miDiv$$);

}

//al cliclar el boton se pintan los pokemons
showbtn$$.addEventListener('click', getApi); //se llama a esta primera funcion, ya que es la contiene todas las demas, generate esta dentro de getapi y paint dentro de generate



