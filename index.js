const params = new URLSearchParams(location.search);

let namePokemon = params.get('name');

const evolucao = document.querySelector('div');
console.log(evolucao);
evolucao.textContent = "Página do " + namePokemon;

const p = document.querySelector('p');
p.textContent = `Evolução do ${namePokemon}`;

function getPokemon(){
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`).then(data => {
        return data.json()}).then((data) => {
            const img = data.sprites.front_default;
            let imgDiv = document.querySelector('img');
            imgDiv.src = img;
            imgDiv.appendChild(img);
        })
        return imgDiv;
} 

getPokemon()