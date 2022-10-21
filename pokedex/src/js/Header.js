import "../css/Header.css"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Header() {
    const [alldatas, setData] = useState([])
    const [chargement, setChargement]=useState(false)
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl, setNextUrl] = useState()


    const getAllPokemmons = async () => {
        setChargement(true)
        const res = await axios.get(url)
        
            console.log(res)
            setNextUrl(res.data.next)
            getPokemmon(res.data.results)
        setChargement(false)
    }

    const getPokemmon = async(LesPokemons) => {
        LesPokemons.map(async(LePokemon)=>{
            const resultatPoke = await axios.get(LePokemon.url)
            // console.log(resultatPoke)
            setData(state=>{
                state=[...state,resultatPoke.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
            })
        })
    }

    useEffect (() => {
        getAllPokemmons();
    }, [url])

    return (
        <div>
            {chargement
            ? <p>Chargement</p>
            : <>
            {alldatas.map((data) => 
            <>
                <li>{data.name} is type {data.types[0].type.name}</li>
                <img src={data.sprites.front_default}/>
                </>
            )}

            </>  }
            {nextUrl && <button onClick={()=>{setData([])
                 setUrl(nextUrl)}}>Change list</button>}


        </div>
    )
}