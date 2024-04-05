const params = new URLSearchParams(location.search);

let namePokemon = params.get('name');

const evolucao = document.querySelector('title');
evolucao.textContent = `Página do ${namePokemon}`;
evolucao.setAttribute('aria-label', `Página do ${namePokemon}`);

const h1 = document.querySelector('h1');
const capitalizedPokemonName = namePokemon.charAt(0).toUpperCase() + namePokemon.slice(1);
h1.textContent = capitalizedPokemonName;

const h2 = document.querySelector('h2');
h2.textContent = `Informações do ${namePokemon}`;

async function getPokemon(){
     const imgDiv = document.querySelector('img');
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
        const data = await response.json();
        const img = data.sprites.front_default;
        imgDiv.src = img;
        imgDiv.setAttribute('aria-label', `${namePokemon}`);
    } catch (error) {
        console.error('Erro ao obter dados do Pokémon:', error);
    }
} 

getPokemon();