const GET_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_SIZE = 9;

const GET = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const getPokemonSpecies = async (pokemonId) => {
  try {
    const data = await GET(`${GET_POKEMON_URL}/${pokemonId}`);
    const description = await GET(data.species.url);
    return { ...data, description };
  } catch (error) {
    alert(`couldn't fetch data for the pokemon with id ${pokemonId}`);
    console.log(error);
  }
};

const getEvolutionChain = async (evolutionChainUrl) => {
  const evolutionChain = await GET(evolutionChainUrl);
  const promises = [];
  promises.push(GET(evolutionChain.chain.species.url));
  if (evolutionChain.chain.evolves_to[0].species?.url) {
    promises.push(GET(evolutionChain.chain.evolves_to[0].species.url));
  }
  if (evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species.url) {
    promises.push(
      GET(evolutionChain.chain.evolves_to[0].evolves_to[0].species.url)
    );
  }
  const evolutionChainIds = (await Promise.all(promises)).map((pokemon) => pokemon.id);
  return await Promise.all(evolutionChainIds.map((pokemonId) => getPokemonSpecies(pokemonId)));
};

export const getPokedexData = async (page) => {
  try {
    const data = await GET(
      `${GET_POKEMON_URL}?offset=${PAGE_SIZE * page}&limit=9`
    );
    const promises = data.results.map((pokemon) => {
      const pathParams = pokemon.url.split("/");
      const pokemonId = pathParams[pathParams.length - 2];
      return getPokemonSpecies(pokemonId);
    });
    return Promise.all(promises);
  } catch (error) {
      alert("There was an error fetching pokemons");
      console.log(error);
  }
};

export const getPokemon = async (pokemonId) => {
  try {
    const baseData = await GET(`${GET_POKEMON_URL}/${pokemonId}`);
    const [locations, description] = await Promise.all([
      GET(baseData.location_area_encounters),
      GET(baseData.species.url),
    ]);
    const evolutions = await getEvolutionChain(description.evolution_chain.url);
    return { ...baseData, locations, description, evolutions };
  } catch (error) {
    alert(`couldn't fetch data for the pokemon`);
    console.log(error);
  }
};
