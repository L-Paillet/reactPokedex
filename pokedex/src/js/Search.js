import { useEffect, useState } from "react"
import axios from 'axios';
import "../css/Search.css"

export default function Search () {
    
const [name, setName] = useState("");
const [Find, setFind] = useState("bulbasaur");
const [Img, setImg] = useState("");
const [Type, setType] = useState("");

// // MODE RECHERCHE
useEffect(() => {
  async function getData() {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Find}`);
    console.log(res);
    setImg(res.data.sprites.front_default);
    setType(res.data.types[0].type.name);
  }

  getData();
}, [Find]);

const Typename = (event) => {
  setName(event.target.value);
};

const Search = () => {
  if (name !== "") setFind(name);
  setName("");
};

return (
  <>
    <div className="back">
      <div className="card">
        <img src={`${Img}`} alt="" />
        <div className="name">{Find.toUpperCase()}</div>

        <div className="type">{Type}</div>

        <input type="text" onChange={Typename} value={name} />

        <button onClick={Search}>Search</button>
      </div>
    </div>
  </>
);
}