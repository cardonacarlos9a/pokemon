import './poke-owned.css'
import PokeList from "../../nested-components/pokemon-list/poke-list";
import CurrentPokemon from "../../nested-components/current-pokemon/current-pokemon";
import SearchBarOwned from "../../nested-components/search-bar/owned/searchBar";
import { useState, useEffect, useContext } from "react/cjs/react.development";
import DetailedPokemon from '../poke-details/detailed-pokemon';
import axios from 'axios';
import { OwnedPokemonContext } from '../../context/ownedPokemonContext';

const PokeOwned = ({ allPokemon }) => {

    const [showFilter, setShowFilter] = useState(false)
    const [currentPokemon, setCurrentPokemon] = useState()
    const [displayDetails, setDisplayDetails] = useState(false)
    const [imageUrl, setImage] = useState('')
    const [moves, setMoves] = useState([])
    const { capturedPokemon, dispatch } = useContext(OwnedPokemonContext)
    const [searchExecuted, setSearchExecuted] = useState(false)

    const selectPokemon = (pokemon) => {
        setCurrentPokemon(() => {
            return pokemon
        })
    }

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

    const detailsFlag = value => {
        setDisplayDetails(() => {
            return value;
        })
    }

    const searchPokemon = pokemonName => {
        setCurrentPokemon(() => {
            const pokemonFound = allPokemon.find((i) => {
                return i.name === pokemonName
            })
            return pokemonFound ? pokemonFound : undefined
        })
    }

    const searchFlag = () => {
        setSearchExecuted(() => {
            return true
        })
    }

    const displayFilterModal = () => {
        setShowFilter(() => {
            return !showFilter;
        })
    };

    const filterByName = () => {
        dispatch({ type: "sortByName" })

    }
    const filterByType = () => {

    }
    return (
        <div className="poke-owned"
            onClick={showFilter ? displayFilterModal : () => { }}>
            <div className="poke-owned__search">
                <SearchBarOwned
                    searchPokemon={searchPokemon}
                    searchFlag={searchFlag}
                    displayFilterModal={displayFilterModal}
                ></SearchBarOwned>
            </div>
            <div className="row">
                <div className="col-md-3 poke-owned__list">
                    <PokeList
                        allPokemon={capturedPokemon}
                        selectPokemon={selectPokemon}
                        emptyListMessage="Not captured pokemon yet"
                        searchExecuted={searchExecuted}
                        searchFlag={searchFlag}
                        currentPokemon={currentPokemon}
                    >
                    </PokeList>
                </div>
                <div className="col-md-9 poke-owned__displayed-pokemon">
                    <CurrentPokemon
                        currentPokemon={currentPokemon}
                        actionButton="RELEASE"
                        selectPokemon={selectPokemon}
                        /*searchExecuted={searchExecuted}*/
                        detailsFlag={detailsFlag}
                        imageUrl={imageUrl}
                    >
                    </CurrentPokemon>
                </div>
            </div>
            <div hidden={!displayDetails} className="pokeOwned__poke-details">
                <DetailedPokemon currentPokemon={currentPokemon}
                    imageUrl={imageUrl}
                    detailsFlag={detailsFlag}
                    moves={moves}
                    actionButton="RELEASE">
                </DetailedPokemon>
            </div>
            <div hidden={!showFilter} className="poke-owned__filter">
                <button className="poke-owned__filter-button"
                    onClick={filterByName}>Por nombre</button>
                <button className="poke-owned__filter-button"
                    onClick={() => { }}>Por tipo</button>
            </div>
        </div>);
}

export default PokeOwned;