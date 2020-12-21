import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
});

export default allReducers