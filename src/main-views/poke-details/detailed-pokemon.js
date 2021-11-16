import './detailed-pokemon.css'
import pokemon from "../../nested-components/current-pokemon/Pokemon.png"
import catchImg from "../../nested-components/current-pokemon/Catch.png"
import { OwnedPokemonContext } from '../../context/ownedPokemonContext'
import { useContext, useEffect, useState } from 'react'

const DetailedPokemon = ({ currentPokemon, imageUrl, detailsFlag, moves, actionButton }) => {

    const { capturedPokemon, dispatch } = useContext(OwnedPokemonContext);
    const [actionButtonState, setActionButtonState] = useState(false)

    const closeDetailsView = () => {
        detailsFlag(false)
    }

    const catchPokemon = () => {
        dispatch({ type: "addPokemon", name: currentPokemon.name, url: currentPokemon.url })
        console.log(currentPokemon)
    }

    const releasePokemon = () => {
        dispatch({ type: "releasePokemon", name: currentPokemon.name })
        detailsFlag(false)
        //selectPokemon(undefined)
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemonFound = currentPokemon ?
                capturedPokemon.find(pokemon => pokemon.name == currentPokemon.name) : false
            pokemonFound && actionButton == "CATCH" ? setActionButtonState(true) : setActionButtonState(false)
        }
        fetchPokemon();
    }, [currentPokemon, capturedPokemon]);

    if (currentPokemon)
        return (
            <div className="details">
                <div className="details__title">
                    <button className="pokeTitle">{currentPokemon.name}</button>
                    <button className="closeBtn"
                        onClick={closeDetailsView}>X</button>
                </div>

                <div className="row align-items-start panelBackground">
                    <div className="col">
                        <img className="pokeImage " src={imageUrl} alt="pokemon">
                        </img>
                    </div>
                    <div className="col details__moves">
                        <h3 className="waterType">Moves</h3>
                        <ul className="skills">
                            {moves.map((move) => (
                                <li>{move.move.name}</li>

                            ))}
                        </ul>
                    </div>
                    <div className="col align-self-end ml-auto">
                        <button
                            className="button"
                            disabled={actionButtonState}
                            onClick={actionButton == "CATCH" ? catchPokemon : releasePokemon}>
                            <img className="detailsButton" alt="no" src={catchImg}
                            ></img>
                        </button>
                        <div className=""><b>{actionButton}</b>
                        </div>
                    </div>

                </div>
            </div>
        )
    return (<></>)
}
export default DetailedPokemon;