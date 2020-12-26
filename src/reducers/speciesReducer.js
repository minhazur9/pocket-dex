const speciesReducer = (state = '', action) => {
    switch(action.type) {
        case 'POKEMON_SPECIES_DATA':
            return action.payload
        default:
            return state
    }
}

export default speciesReducer;