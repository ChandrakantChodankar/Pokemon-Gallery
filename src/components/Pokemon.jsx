import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const limit = 500;
  const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchPokemon, setSearchPokemon] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        const detailedPokemonData = data.results.map(async (curPoke) => {
          const res = await fetch(curPoke.url);
          const details = await res.json();
          return details;
        });

        const detailedResponses = await Promise.all(detailedPokemonData);
        setPokemon(detailedResponses);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchPokemon();
  }, [API]);

  const filterPokemon = pokemon.filter((curPokemon) => {
    return curPokemon.name.toLowerCase().includes(searchPokemon.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-600">{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center m-10 gap-5">
      <h1 className="text-4xl font-bold">Let's Catch Pokemon</h1>

      <div className="w-full max-w-sm min-w-[200px]">
        <input
          type="text"
          placeholder="Search Pokemon"
          autoComplete="off"
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value)}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      </div>
      {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop, 4 large, 5 ultra-wide */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 sm:px-10 md:px-20 gap-6 mt-5 text-center">
        {filterPokemon.map((curPokemon) => {
          return <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />;
        })}
      </div>
      {filterPokemon.length === 0 && (
        <p className="text-xl text-gray-500 mt-10">No Pokemon found</p>
      )}
    </section>
  );
};

