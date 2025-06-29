function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
        alt="Pikachu corriendo"
      />
      <p className="text-2xl text-amber-50 ml-4">Cargando...</p>
    </div>
  );
}

export default Loading;
