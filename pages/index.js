document.addEventListener("DOMContentLoaded", () => {
    const pokemonName = getPokemonName();
    getPokemon(pokemonName);
    changeTitle(pokemonName);
    changeH1(pokemonName);
    changeH2(pokemonName);
})


function getPokemonName(){
    if(!location.search) {
        return
    }
    const params = new URLSearchParams(location.search);
    return params.get('name');;
}

function changeTitle(name){
    document.title = `Página do ${name}`
}

function changeH1(name){
    const h1 = document.querySelector('h1');
    const capitalizedPokemonName = name.charAt(0).toUpperCase() + name.slice(1);
    h1.textContent = capitalizedPokemonName;
}

function changeH2(name){
    const h2 = document.querySelector('h2');
    h2.textContent = `Informações do ${name}`;
}

async function getPokemon(name){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        const img = data.sprites.front_default;
        createPokemonImage(name, img)
    } catch (error) {
        console.error(`Erro ao obter dados do Pokémon: ${error}`);
    }
} 

function createPokemonImage(pokemonName, imgUrl){
    const imgDiv = document.createElement('img');
    imgDiv.src = imgUrl;
    imgDiv.alt= `Imagem do pokemon ${pokemonName}`;
    const section = document.querySelector("#info-pokemon");
    section.appendChild(imgDiv);
}