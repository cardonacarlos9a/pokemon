export default function ownedPokemonReducer(ownedPokemonList, action) {
    switch (action.type) {
        case "addPokemon":
            const { name, url } = action;
            return [...ownedPokemonList, { name, url }]
        case "releasePokemon": {
            const { name } = action;
            return ownedPokemonList.filter(pokemon => pokemon.name != name)
        }
        case "sortByName": {
            return ownedPokemonList.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
        }
        case "sortByType": {

        }
        default:
            throw new Error("unhanled action type " + action.type);
    }
}