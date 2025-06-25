import { Suspense } from "react";
import Pokemons from "../page";

async function getDetailsPokemon(slug) {
  const rest = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const data = await rest.json();
  return data;
}

async function PokemonDescription({ params }) {
  const slug = params.slug;
  const pokemon = await getDetailsPokemon(slug);
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
      </div>
      <hr />
      <Suspense fallback={<div>Loading Pokemons...</div>}>
        <Pokemons />
      </Suspense>
    </>
  );
}

export default PokemonDescription;
