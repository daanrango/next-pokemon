import PokemonsCard from "../components/PokemonsCard";

async function loadPokemons(count = 21) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${count}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching pokemons`);
  }
  const data = await response.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();
      const speciesRes = await fetch(pokeData.species.url);
      const speciesData = await speciesRes.json();
      if (speciesData.evolves_from_species === null) {
        return pokeData;
      }
      return null;
    })
  );

  return detailedPokemons.filter(Boolean);
}

async function Pokemons() {
  const listPokemons = await loadPokemons(120);
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {listPokemons.map((pokemon) => (
        <PokemonsCard pokemon={pokemon} key={`${pokemon.name}-${pokemon.id}`} />
      ))}
    </div>
  );
}

export default Pokemons;
