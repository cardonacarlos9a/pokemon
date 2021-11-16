import './poke-full-list.css'
import PokeList from "../../nested-components/pokemon-list/poke-list";
import SearchBar from '../../nested-components/search-bar/search-bar';
import CurrentPokemon from '../../nested-components/current-pokemon/current-pokemon';
import { useState, useEffect } from 'react';
import DetailedPokemon from '../poke-details/detailed-pokemon';
import axios from 'axios';

const PokeFullList = ({ allPokemon }) => {

    const [currentPokemon, setCurrentPokemon] = useState()
    const [searchExecuted, setSearchExecuted] = useState(false)
    const [displayDetails, setDisplayDetails] = useState(false)
    const [imageUrl, setImage] = useState('')
    const [moves, setMoves] = useState([])

    useEffect(() => {
        const fetchPokemon = async () => {
            if (currentPokemon) {
                const rsp = await axios.get(currentPokemon.url);
                setImage(rsp.data.sprites.other.dream_world.front_default);
                setMoves(rsp.data.moves)
            }
        }
        fetchPokemon();
    }, [currentPokemon]);

    function selectPokemon(pokemon) {
        setCurrentPokemon(() => {
            searchFlag(true, pokemon)
            return pokemon
        })
    }

    function filterPokemon(pokemonName) {
        setCurrentPokemon(() => {
            const pokemonFound = allPokemon.find((i) => {
                return i.name === pokemonName
            })
            searchFlag(true);
            return pokemonFound ? pokemonFound : undefined
        })
    }

    function searchFlag(value, searchText) {
        setSearchExecuted(() => {
            if (!value && !searchText) { return false }
            if (value) {
                if (searchText)
                    return false
                else
                    return true;
            }
            return searchExecuted;
        })
    }

    function detailsFlag(value) {
        setDisplayDetails(() => {
            return value;
        })
    }

    return (
        <div className="pokeFullList">
            <div className="pokeFullList__search">
                <SearchBar
                    filterPokemon={filterPokemon}
                    searchFlag={searchFlag}>
                </SearchBar>
            </div>
            <div className="row sample">
                <div className="col-sm-3 pokeFullList__list">
                    <PokeList
                        allPokemon={allPokemon}
                        selectPokemon={selectPokemon}
                        searchExecuted={searchExecuted}
                        currentPokemon={currentPokemon}
                        searchFlag={searchFlag}
                        emptyListMessage="... Pokemon will soon appear"
                    >
                    </PokeList>
                </div>
                <div className="col-sm pokeFullList__currentPokemon">
                    <CurrentPokemon
                        currentPokemon={currentPokemon}
                        searchExecuted={searchExecuted}
                        detailsFlag={detailsFlag}
                        imageUrl={imageUrl}
                        actionButton="CATCH"
                    >
                    </CurrentPokemon>
                </div>
            </div>
            <div hidden={!displayDetails} className="pokeFullList__poke-details">
                <DetailedPokemon
                    currentPokemon={currentPokemon}
                    imageUrl={imageUrl}
                    detailsFlag={detailsFlag}
                    moves={moves}
                    actionButton="CATCH">
                </DetailedPokemon>
            </div>
        </div>
    );
}

export default PokeFullList;