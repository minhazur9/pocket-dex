import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import loadingReducer from './loadingReducer';
import speciesReducer from './speciesReducer';
import movesReducer from './movesReducer';
import moveInfoReducer from './moveInfoReducer';
import evolutionChainReducer from './evolutionChainReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
    loading: loadingReducer,
    speciesInfo: speciesReducer,
    moves: movesReducer,
    moveInfo: moveInfoReducer,
    evolutionChain: evolutionChainReducer,
});

export default allReducers