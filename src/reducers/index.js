import pokemonReducer from './pokemonReducer';
import infoReducer from './infoReducer';
import loadingReducer from './loadingReducer';
import speciesReducer from './speciesReducer';
import movesReducer from './movesReducer';
import moveInfoReducer from './moveInfoReducer';
import evolutionChainReducer from './evolutionChainReducer';
import abilitesReducer from './abilitiesReducer';
import abilityInfoReducer from './abilityInfoReducer';
import itemsReducer from './itemsReducer';
import itemInfoReducer from './itemInfoReducer';
import loggedInReducer from './LoggedInReducer';
import teamPokemonInfoReducer from './teamPokemonInfoReducer';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    pokemon: pokemonReducer,
    info: infoReducer,
    loading: loadingReducer,
    speciesInfo: speciesReducer,
    moves: movesReducer,
    moveInfo: moveInfoReducer,
    evolutionChain: evolutionChainReducer,
    abilities: abilitesReducer,
    abilityInfo: abilityInfoReducer,
    items: itemsReducer,
    itemInfo: itemInfoReducer,
    loggedIn: loggedInReducer,
    teamPokemonInfo: teamPokemonInfoReducer,
});

export default allReducers