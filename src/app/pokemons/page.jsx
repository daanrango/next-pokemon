import PokemonsCard from "../components/PokemonsCard";

async function loadPokemons(count = 21) {
  const randomsIds = new Set();
  while (randomsIds.size < count) {
    const randomId = Math.floor(Math.random() * 1008) + 1;
    randomsIds.add(randomId);
  }
  const detailsData = await Promise.all(
    Array.from(randomsIds).map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching Pokemon with id ${id}`);
      }
      return await response.json();
    })
  );
  return detailsData;
}

async function Pokemons() {
  const listPokemons = await loadPokemons();
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {listPokemons.map((pokemon) => (
        <PokemonsCard pokemon={pokemon} key={`${pokemon.name}-${pokemon.id}`} />
      ))}
    </div>
  );
}

export default Pokemons;
