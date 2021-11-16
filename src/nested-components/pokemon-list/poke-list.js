import './poke-list.css'

const PokeList = ({ allPokemon, selectPokemon, searchExecuted, currentPokemon, emptyListMessage }) => {

    if (currentPokemon && searchExecuted) {
        return (
            <div className="pokeList">
                <ul className="pokeList__section section">
                    <li className="pokeList__row">
                        <button
                            className="pokeList__button">
                            {currentPokemon.name}
                        </button>
                    </li>
                </ul>
            </div>)
    }

    return (
        <>
            {
                allPokemon && allPokemon.length > 0 ? (
                    <div className="pokeList">
                        <ul className="pokeList__section section">
                            {allPokemon.map((item) => (
                                <li className="pokeList__row" key={item.name}>
                                    <button
                                        className="pokeList__button"
                                        onClick={() => selectPokemon(item)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>) :
                    <div className="pokeList">
                        <div className="pokeList__section section">
                            {emptyListMessage}
                        </div>
                    </div>
            }
        </>
    )
}
export default PokeList;