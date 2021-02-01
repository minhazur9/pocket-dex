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

export const searchPokemon = (term) => {
    return {
        type: 'POKEMON_SEARCH_DATA',
        payload: term
    }
}

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

export const searchMoves = (term) => {
    return {
        type: 'MOVES_SEARCH_DATA',
        payload: term
    }
}

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

export const searchAbilities = (term) => {
    return {
        type: 'ABILITY_SEARCH_DATA',
        payload: term,
    }
}

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

export const searchItems = (term) => {
    return {
        type: 'ITEM_SEARCH_DATA',
        payload: term,
    }
}

export const startLoading = () => {
    return {
        type: 'START_LOADING'
    }
}

export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    }
}

export const logIn = () => {
    return {
        type: 'LOG_IN'
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}
