function changePageTitle(title) {
    document.title = title
  }
  
  function generateInfoSection(pokemonName, sprites) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`
  
    const img = document.querySelector('img')
    
    img.alt = `Imagem do pokemon ${pokemonName}`
    img.src =  sprites[0];
    img.addEventListener('click', () => getImage(img, sprites))
  
    const section = document.querySelector('#info-pokemon')
  
    section.appendChild(h2)
    section.appendChild(img)
  }

  let clicks = 0
  function getImage(img, sprites){      
       clicks++;
      if (clicks >= sprites.length) {
        clicks = 0;
      }
      img.src = sprites[clicks];
  }
  
  async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))
  
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
      const jsonData = await data.json()

      const sprites = Object.values(jsonData.sprites).filter(sprite => typeof sprite === 'string');
      generateInfoSection(name, sprites)      
      
      } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
      return
    }
  
    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)
  
    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')
  
    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
  })

  let counter = parseInt(localStorage.getItem("count")) || 1;

  function getCountVisitors(){
    document.addEventListener("DOMContentLoaded", (event) => {
      counter++;
      localStorage.setItem("count", counter);
    });
    return counter;
  }

  function getTime(){
    let date = new Date();
    date = new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(date);
  
    localStorage.setItem("data", date);
    return date;
  }

  function addFooter(){
    const footer = document.querySelector('footer');
    if (footer) {
      const p = document.createElement('p');
      const count = getCountVisitors();
      const time = getTime();
      p.textContent = `Esta página foi visitada ${count} vezes. A última visita foi: ${time}`;
      footer.appendChild(p);
    } else {
      console.error('Elemento <footer> não encontrado.');
    }
  }
addFooter()