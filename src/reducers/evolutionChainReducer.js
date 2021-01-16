const evolutionChainReducer = (state = [], action) => {
    switch(action.type) {
        case 'POKEMON_EVOLUTION_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default evolutionChainReducer;