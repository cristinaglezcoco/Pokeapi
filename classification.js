const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemon = 150;
let eachPokemonStat = [];

async function getApi () {
    
    for (let i = 0; i < numberOfPokemon; i++) {
        const url = baseUrl + (i + 1);
    
        try {
            const response = await fetch(url);
            const result = await response.json();
            // console.log(result.stats);
            const stats = result;
            getStats(stats);
            //console.log(stats);
        } catch (error) {
            console.error(error);
        }
    };
}

getApi();

function getStats(stats) {
    const pokemonStats = {
        namePokemon: stats.name,
        imagen: stats.sprites['front_default'],
        id: stats.id,
        hp: stats.stats[0].base_stat,
        attack: stats.stats[1].base_stat,
        defense: stats.stats[2].base_stat,
        specialAttack: stats.stats[3].base_stat,
        specialDefense: stats.stats[4].base_stat,
        speed: stats.stats[5].base_stat,
        total: stats.stats[0].base_stat +  stats.stats[1].base_stat +  stats.stats[2].base_stat +  stats.stats[3].base_stat +  stats.stats[4].base_stat +  stats.stats[5].base_stat
    }
    eachPokemonStat.push(pokemonStats);

    if (eachPokemonStat.length === numberOfPokemon) {
        orderByTotal();
    }
    //console.log(pokemonStats);
}


function orderByTotal() {
    eachPokemonStat.sort(function (a, b) {
      return b.total - a.total; // Ordenar de mayor a menor, se pasa en la de getApi para que los ordene al cargar la info
    });
    //console.log(eachPokemonStat);
    paintPokemon(eachPokemonStat);
}

const orderPokemons = document.querySelector('.container-orderpokemons');

function paintPokemon(eachPokemonStat) {

    for(let stat of eachPokemonStat) {

        const miDiv$$ = document.createElement('div');

        const img$$ = document.createElement('img');
        img$$.src = stat.imagen;
        img$$.alt = stat.namePokemon;
        miDiv$$.appendChild(img$$);

        const img1$$ = document.createElement('img');
        img1$$.classList.add('cardpokeball');
        img1$$.src = './assets/pokeball.png';
        miDiv$$.appendChild(img1$$);
       
        const title$$ = document.createElement('h2');
        title$$.textContent = stat.namePokemon;
        miDiv$$.appendChild(title$$);

        const totalStats$$ = document.createElement('p');
        totalStats$$.textContent = `Total Stats: ${stat.total}`;
        miDiv$$.appendChild(totalStats$$);

        const myStats$$= document.createElement('ul');
        myStats$$.classList.add('statsList');

        const itemsStats1$$ = document.createElement('li');
        itemsStats1$$.textContent = `Hp: ${stat.hp}`;
        myStats$$.appendChild(itemsStats1$$);
        const itemsStats2$$ = document.createElement('li');
        itemsStats2$$.textContent = `Attack: ${stat.attack}`;
        myStats$$.appendChild(itemsStats2$$);
        const itemsStats3$$ = document.createElement('li');
        itemsStats3$$.textContent = `Defense: ${stat.defense}`;
        myStats$$.appendChild(itemsStats3$$);
        const itemsStats4$$ = document.createElement('li');
        itemsStats4$$.textContent = `Special Attack: ${stat.specialAttack}`;
        myStats$$.appendChild(itemsStats4$$);
        const itemsStats5$$ = document.createElement('li');
        itemsStats5$$.textContent = `Special Defense: ${stat.specialDefense}`;
        myStats$$.appendChild(itemsStats5$$);
        const itemsStats6$$ = document.createElement('li');
        itemsStats6$$.textContent = `Speed: ${stat.speed}`;
        myStats$$.appendChild(itemsStats6$$);

        miDiv$$.appendChild(myStats$$);
        orderPokemons.appendChild(miDiv$$);
    }
}