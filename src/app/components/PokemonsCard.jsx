"use client";
import Link from "next/link";
function PokemonsCard({ pokemon }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md grid grid-cols-2">
      <div className="w-8/12 mx-auto flex justify-center items-center">
        <img
          className="w-full"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="text-center p-5 flex flex-col justify-evenly">
        <h2 className="text-2xl uppercase">{pokemon.name}</h2>
        <Link className="bg-blue-300 py-0.5" href={`/pokemons/${pokemon.id}`}>
          Details
        </Link>
      </div>
    </div>
  );
}

export default PokemonsCard;
