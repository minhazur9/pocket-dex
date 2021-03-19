const infoReducer = (state = '', action) => {
    switch(action.type) {
        case 'POKEMON_INFO_DATA':
           return action.payload
        default:
            return state
    }
}

export default infoReducer;