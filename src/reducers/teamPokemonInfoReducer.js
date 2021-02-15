const teamPokemonReducer = (state = '', action) => {
    switch(action.type) {
        case 'TEAM_POKEMON_INFO_DATA':
           return action.payload
        case 'CLEAR_POKEMON_INFO_DATA':
            return ''
        default:
            return state
    }
}

export default teamPokemonReducer;