import pokemonReducer from './pokemonReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
});

export default allReducers