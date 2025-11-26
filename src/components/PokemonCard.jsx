export const PokemonCard = ({ pokemonData }) => {
  const getStat = (statName) =>
    pokemonData.stats.find((stat) => stat.stat.name === statName)?.base_stat ||
    0;

  return (
    <li className="p-5 rounded-lg shadow-[0px_20px_30px_-10px_rgb(38,57,77)] hover:scale-110 list-none transition-all duration-500 ease-in-out">
      <figure className="flex justify-center mb-4">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="h-40 w-[60%] object-contain"
          onError={(e) => {
            e.target.src = pokemonData.sprites.front_default;
          }}
        />
      </figure>

      <h1 className="capitalize text-2xl font-bold text-center mb-3">
        {pokemonData.name}
      </h1>

      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {pokemonData.types.map((type) => (
          <span
            key={type.type.name}
            className="bg-green-500 text-white rounded-full px-3 py-1 capitalize text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* stat grid 1 */}
      <div className="grid grid-cols-3 gap-2 text-sm text-center pb-3 border-b border-gray-200">
        <div>
          <p className="font-bold text-xs">Height: </p>
          <p>{pokemonData.height}</p>
        </div>
        <div>
          <p className="font-bold text-xs">Weight: </p>
          <p>{pokemonData.weight}</p>
        </div>
        <div>
          <p className="font-bold text-xs">Speed: </p>
          <p>{getStat("speed")}</p>
        </div>
      </div>

      {/* stat grid 2 */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm pt-3">
        <div>
          <p>{pokemonData.base_experience}</p>
          <p className="font-bold text-xs">Experience:</p>
        </div>
        <div>
          <p>{getStat("attack")}</p>
          <p className="font-bold text-xs">Attack:</p>
        </div>
        <div>
          <p>{pokemonData.abilities[0]?.ability.name || "None"}</p>
          <p className="font-bold text-xs">Ability:</p>
        </div>
      </div>
    </li>
  );
};
