import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import loadingReducer from './loadingReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
    loading: loadingReducer,
});

export default allReducers