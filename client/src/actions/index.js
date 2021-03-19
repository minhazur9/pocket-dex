import axios from 'axios';

// Pokemon Endpoint
const pokemonListURL = 'https://pokeapi.co/api/v2/pokemon?limit=893';
const pokemonInfoURL = 'https://pokeapi.co/api/v2/pokemon/';
const speciesInfoURL = 'https://pokeapi.co/api/v2/pokemon-species/';
const movesListURL = 'https://pokeapi.co/api/v2/move?limit=813';
const moveInfoURL = 'https://pokeapi.co/api/v2/move/';
const abilityListURL = 'https://pokeapi.co/api/v2/ability?limit=327';
const abilityInfoURL = 'https://pokeapi.co/api/v2/ability/';
const itemListURL = 'https://pokeapi.co/api/v2/item?limit=954';
const itemInfoURL = 'https://pokeapi.co/api/v2/item/';


// get all pokemon from api
export const getPokemon = () => {
    return (dispatch) => {
        const cachedData = localStorage.getItem('pokemon-list-data')
        if (cachedData) {
            dispatch({
                type: 'POKEMON_LIST_DATA',
                payload: JSON.parse(cachedData)
            })
        }
        else {
            return axios.get(pokemonListURL)
                .then((response) => {
                    dispatch({
                        type: 'POKEMON_LIST_DATA',
                        payload: response.data.results
                    })
                    const dataString = JSON.stringify(response.data.results)
                    localStorage.setItem('pokemon-list-data', dataString)
                })
                .catch(error => {
                    throw (error);
                });
        }

    };
};

// get information of a pokemon from api
export const getInfo = (name) => {
    return (dispatch) => {
        return axios.get(pokemonInfoURL + name)
            .then((response) => {
                dispatch({
                    type: 'POKEMON_INFO_DATA',
                    payload: response.data
                })
            })
    }
}

// get species information of a pokemon from api
export const getSpeciesInfo = (name) => {
    return (dispatch) => {
        return axios.get(speciesInfoURL + name)
            .then((response) => {
                dispatch({
                    type: 'POKEMON_SPECIES_DATA',
                    payload: response.data
                })
            })
    }
}

// search for the pokemon
export const searchPokemon = (term) => {
    return {
        type: 'POKEMON_SEARCH_DATA',
        payload: term
    }
}

// get all moves from the api
export const getMoves = () => {
    return (dispatch) => {
        const cachedData = localStorage.getItem('moves-data');
        if (cachedData) {
            dispatch({
                type: 'MOVES_LIST_DATA',
                payload: JSON.parse(cachedData)
            })
        }
        else {
            axios.get(movesListURL)
                .then((response) => {
                    dispatch({
                        type: 'MOVES_LIST_DATA',
                        payload: response.data.results
                    })
                    const dataString = JSON.stringify(response.data.results)
                    localStorage.setItem('moves-data', dataString)
                })
                .catch((error) => {
                    throw (error);
                })
        }
    }
}

// get information of a move from the api
export const getMoveInfo = (move) => {
    return (dispatch) => {
        return axios.get(moveInfoURL + move)
            .then((response) => {
                dispatch({
                    type: 'MOVE_INFO_DATA',
                    payload: response.data
                })
            })
    }
}

// search from all moves
export const searchMoves = (term) => {
    return {
        type: 'MOVES_SEARCH_DATA',
        payload: term
    }
}

// get the evolution chain of a pokemon from the api
export const getEvolutionChain = (endpoint) => {
    return (dispatch) => {
        return axios.get(endpoint)
            .then((response) => {
                dispatch({
                    type: 'POKEMON_EVOLUTION_DATA',
                    payload: response.data.chain,
                })
            })
    }
}


// get all abilites from the api
export const getAbilities = () => {
    return (dispatch) => {
        const cachedData = localStorage.getItem('abilities-data');
        if (cachedData) {
            dispatch({
                type: 'ABILITY_LIST_DATA',
                payload: JSON.parse(cachedData)
            })
        }
        else {
            return axios.get(abilityListURL)
                .then((response) => {
                    dispatch({
                        type: 'ABILITY_LIST_DATA',
                        payload: response.data.results,
                    })
                    const dataString = JSON.stringify(response.data.results)
                    localStorage.setItem('abilities-data', dataString)
                })
                .catch((error) => {
                    throw error;
                })
        }
    }
}

// search through all abilities
export const searchAbilities = (term) => {
    return {
        type: 'ABILITY_SEARCH_DATA',
        payload: term,
    }
}

// get information of an ability from the api
export const getAbilityInfo = (ability) => {
    return (dispatch) => {
        axios.get(abilityInfoURL + ability)
            .then((response) => {
                dispatch({
                    type: 'ABILITY_INFO_DATA',
                    payload: response.data,
                })
            })
    }

}

// get all items from the api
export const getItems = () => {
    const cachedData = localStorage.getItem('items-data');
    return (dispatch) => {
        if (cachedData) {
            dispatch({
                type: 'ITEM_LIST_DATA',
                payload: JSON.parse(cachedData)
            })
        }
        else {
            axios.get(itemListURL)
                .then((response) => {
                    dispatch({
                        type: 'ITEM_LIST_DATA',
                        payload: response.data.results
                    })
                    const dataString = JSON.stringify(response.data.results);
                    localStorage.setItem('items-data', dataString)
                })
                .catch((error) => {
                    throw error;
                })
        }
    }
}

// get information of an item from the api
export const getItemInfo = (item) => {
    return (dispatch) => {
        axios.get(itemInfoURL + item)
            .then((response) => {
                dispatch({
                    type: 'ITEM_INFO_DATA',
                    payload: response.data
                })
            }
            )

    }
}

// search from all the items
export const searchItems = (term) => {
    return {
        type: 'ITEM_SEARCH_DATA',
        payload: term,
    }
}

// start loading
export const startLoading = () => {
    return {
        type: 'START_LOADING'
    }
}

// stop loading
export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    }
}

// login user
export const logIn = () => {
    return {
        type: 'LOG_IN'
    }
}

// logout user
export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

// get pokemon information from a team
export const getTeamPokemonInfo = (info) => {
    return {
        type: 'TEAM_POKEMON_INFO_DATA',
        payload: info
    }
}
