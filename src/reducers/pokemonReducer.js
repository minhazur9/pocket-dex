const pokemonReducer = (state = [], action) => {
    switch(action.type) {
        case 'POKEMON_LIST_DATA':
           return [ ...action.payload]
        case 'POKEMON_SEARCH_DATA':
            const foundPokemon = [];
            state.forEach((pokemon) => {
                if(pokemon.name === action.payload) foundPokemon.push(pokemon)
            });
            return foundPokemon
        default:
            return state
    }
}

export default pokemonReducer;