
const pokemonList = POKEMON.pokemon;
const typesPokemon = [];
const allDataElements = [];
listPokemonsByType();
list(pokemonList);

const $pokemonTypes = document.querySelector("#filterByType");
const $orderByAlphabet = document.querySelector("#orderByAlphabet");
const $search = document.querySelector("#search");

$orderByAlphabet.addEventListener("change", handleFilters);
$pokemonTypes.addEventListener("change", handleFilters);
$search.addEventListener("input", () => {
  const time = setTimeout(handleFilters, 300);
  return time;
});

function list(pokemons) {
  document.getElementById("pokemonList").innerHTML = "";
  pokemons.forEach((pokemon) => {
    document.getElementById("pokemonList").innerHTML += `
    <div class="card">
    <img class="pokemon-image" src="${pokemon.img}" alt="pokemon">
    <div class="name-and-number">
    <p class="name"> ${pokemon.name}<p>
    <p class="pokemonNumber"># ${pokemon.num} </p>
    </div>
    <div class="pokemonInfo">
    <p class="element-title">Element:</p>

    <div class="elements" id="elements">
    ${listElements(pokemon.type)}
    </div>
  </div>
  </div>
  `;
  });
}

function listElements(elements) {
  
  let elementsList = "";
  elements.forEach((actualElement) => {
    elementsList += `
      <div class="label label-${actualElement.toLowerCase()}">${actualElement.toLowerCase()}</div>
      `;
  });
  return elementsList;
}

function countedType() {
  const elements = allDataElements.reduce((allElements, type) => {
    if (type in allElements) {
      allElements[type]++;
    } else {
      allElements[type] = 1;
    }
    return allElements;
  }, {});

  return percentage(elements);
}

function percentage(elements) {
  for (let type in elements) {
    elements[type] = ((elements[type] / 151) * 100).toFixed(2);
  }
  return elements;
} 

function listPokemonsByType() {
  pokemonList.forEach((pokemon) => {
    pokemon.type.forEach((elementType) => {
      allDataElements.push(elementType);
      if (!typesPokemon.includes(elementType)) {
        document.getElementById("filterByType").innerHTML += `
      <option value="${elementType}">${elementType}</option>
      `;
        typesPokemon.push(elementType);
      }

    });

  });
  chartTypes(typesPokemon, Object.values(countedType()));
}

function chartTypes(labelList, dataList) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labelList,
      datasets: [{
        label: "Percentage of Pokemon Types",
        backgroundColor: [
          "#3a5f03",
          "#440b53",
          "#ff7009",
          "#052831",
          "#2c8ba3",
          "#96ee12",
          "#a4acaf",
          "#eed535",
          "#645201",
          "#9e4200",
          "#f366b9",
          "#9b8454",
          "#06f8f8",
          "#9450c2",
          "#ecba95",
        ],

        borderColor: "#353535",
        data: dataList,
      }]

    },

    // Configuration options go here
    options: {
      legend: {
        position: "right"
      }

    }
  });
}