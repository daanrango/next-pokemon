import Link from "next/link";
function Nabar() {
  return (
    <div
      id="navigation"
      className="bg-gray-800 p-5 flex justify-between items-center"
    >
      <Link href="/">
        <h1 className="text-3xl">Pokemons Site</h1>
      </Link>
      <ul className="flex gap-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/tienda">Tienda</Link>
        </li>
        <li>
          <Link href="/pokemons">Pokemons</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nabar;
