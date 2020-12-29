import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import loadingReducer from './loadingReducer';
import speciesReducer from './speciesReducer';
import movesReducer from './movesReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
    loading: loadingReducer,
    speciesInfo: speciesReducer,
    moves: movesReducer,
});

export default allReducers