import { POKEMON_LIST_DATA } from '../actions/types';

const pokemonReducer = (state = [], action) => {
    switch(action.type) {
        case POKEMON_LIST_DATA:
           return [ ...action.payload]
        default:
            return state
    }
}

export default pokemonReducer;