import axios from "axios";
import { useEffect, useState } from "react";

const usePokemon = () => {
    const [allPokemon, setAllPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const rsp = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
            const pokemon = rsp.data.results
            setAllPokemon(pokemon);
        }
        fetchPokemon();
    }, []);

    return allPokemon;
};
export default usePokemon;