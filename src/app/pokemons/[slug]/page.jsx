import { Suspense } from "react";
import Pokemons from "../page";
import PokemonsCard from "@/app/components/PokemonsCard";

async function getDetailsPokemon(slug) {
  const rest = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const data = await rest.json();
  return data;
}

async function getEvolutionChain(speciesUrl) {
  const speciesRes = await fetch(speciesUrl);
  const speciesData = await speciesRes.json();
  const evolutionRes = await fetch(speciesData.evolution_chain.url);
  return evolutionRes.json();
}

function getEvolutionNames(chain, evolutions = []) {
  evolutions.push(chain.species.name);
  if (chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evo) => getEvolutionNames(evo, evolutions));
  }
  return evolutions;
}

async function PokemonDescription({ params }) {
  const slug = params.slug;
  const pokemon = await getDetailsPokemon(slug);

  const evolutionData = await getEvolutionChain(pokemon.species.url);
  const evolutionNames = getEvolutionNames(evolutionData.chain);

  const evolutionsWithSprites = await Promise.all(
    evolutionNames.map(async (name) => {
      const evoPokemon = await getDetailsPokemon(name);
      return evoPokemon;
    })
  );

  return (
    <>
      <div className="w-9/12 mx-auto my-10 flex flex-col items-center">
        <h1 className="text-4xl uppercase">{pokemon.name}</h1>
        <div className="flex w-full justify-center">
          <img
            className="w-5/12"
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold uppercase">Tipo(s):</h2>
              <ul className="list-disc list-inside">
                {pokemon.types.map((t) => (
                  <li key={t.type.name}>{t.type.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold uppercase">Habilidades:</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map((a, i) => (
                  <li key={`${a.ability.name}-${i}`}>
                    {a.ability.name}
                    {a.is_hidden && " (oculta)"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold uppercase">Estadísticas:</h2>
              <ul className="list-disc list-inside">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    <span className="capitalize">{stat.stat.name}:</span>{" "}
                    {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold uppercase">
                Caracterisiticas:
              </h2>
              <ul className="list-disc list-inside">
                <li>Altura: {pokemon.height / 10} m</li>
                <li>Peso: {pokemon.weight / 10} kg</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
          <h2 className="text-2xl text-center font-bold uppercase mb-4">
            Evoluciones
          </h2>
          <div className="grid grid-cols-3 gap-3 p-3">
            {evolutionsWithSprites.map((pokemon) => (
              <PokemonsCard
                pokemon={pokemon}
                key={`${pokemon.name}-${pokemon.id}`}
              />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <Suspense
        fallback={
          <div className="flex items-center justify-center my-5">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
              alt="Pikachu corriendo"
            />
            <p className="text-2xl text-amber-50 ml-4">
              Cargando Other Pokemons...
            </p>
          </div>
        }
      >
        <Pokemons />
      </Suspense>
    </>
  );
}

export default PokemonDescription;
