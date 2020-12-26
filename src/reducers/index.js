import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import loadingReducer from './loadingReducer';
import speciesReducer from './speciesReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
    loading: loadingReducer,
    speciesInfo: speciesReducer,
});

export default allReducers