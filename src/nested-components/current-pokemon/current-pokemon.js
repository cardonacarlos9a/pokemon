import details from "./Details.png"
import catchImg from "./Catch.png"
import pokemon from "./Pokemon.png"
//import pokeType from "./PokemonType.png"
import './current-pokemon.css'
import { OwnedPokemonContext } from "../../context/ownedPokemonContext"
import { useContext, useState, useEffect } from "react"

const CurrentPokemon = ({ currentPokemon, searchExecuted, detailsFlag, imageUrl, actionButton, selectPokemon }) => {
    const [actionButtonState, setActionButtonState] = useState(false)

    const { capturedPokemon, dispatch } = useContext(OwnedPokemonContext)

    function detailsFlagAction() {
        detailsFlag(true);
    }

    const catchPokemon = () => {
        dispatch({ type: "addPokemon", name: currentPokemon.name, url: currentPokemon.url })
        setActionButtonState(true)
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemonFound = currentPokemon ?
                capturedPokemon.find(pokemon => pokemon.name == currentPokemon.name) : false
            pokemonFound && actionButton == "CATCH" ? setActionButtonState(true) : setActionButtonState(false)
        }
        fetchPokemon();
    }, [currentPokemon, capturedPokemon]);


    const releasePokemon = () => {
        dispatch({ type: "releasePokemon", name: currentPokemon.name })
        selectPokemon(undefined)
    }


    if (!currentPokemon && searchExecuted) {
        return (
            <div className="current-pokemon">no results found</div>
        )
    }

    if (currentPokemon)
        return (
            <div className="row current-pokemon">
                <div className="col-md-8 current-pokemon__left-column">
                    <div className="current-pokemon__title">
                        <button className="current-pokemon_arrowBtn"></button>
                        <strong> {currentPokemon.name}</strong>
                        <button className="current-pokemon_arrowBtn"></button>

                    </div>
                    <img className="current-pokemon__image" src={imageUrl} alt="pokemon"></img>

                </div>
                <div className="col-md-4 current-pokemon__right-column">
                    <div className="alignButton">
                        <button
                            className="current-pokemon__button current-pokemon__catchBtn"
                            onClick={actionButton == "CATCH" ? catchPokemon : releasePokemon}
                            disabled={actionButtonState}
                        >
                        </button>
                        <div className="buttonTextSize"><b>{actionButton}</b>
                        </div>
                    </div>
                    <div className="alignButton">
                        <button className="current-pokemon__button current-pokemon__detailsBtn"
                            onClick={detailsFlagAction}
                        >
                        </button>
                        <div className="buttonTextSize"
                        ><b>DETAILS</b></div>
                    </div>
                </div>
            </div >
        )
    return (
        <div className="current-pokemon">Select or search a pokemon</div>
    )
}

export default CurrentPokemon;