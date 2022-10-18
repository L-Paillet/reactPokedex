import "../css/Header.css"
import { useEffect, useState } from "react"
export default function Header() {
    const {allPokemons, setAllPokemons} = useState({})
    const getAllPokemmons = async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        const data = await res.json();

        function createPokemonObject(results) {
            results.forEach(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const data = await res.json();
                setAllPokemons((currentList) => [...currentList, data]);
                await allPokemons.sort((a,b)=> a.id - b.id);
            });
        }
        createPokemonObject(data.results);
        console.log(allPokemons);       
    };
    useEffect(()=>{
        getAllPokemmons();
    }, [])

    return (
        <div>
            {/* {allPokemons.map(data.results)} */}
        </div>
    )
}