import axios from 'axios';

// Pokemon Endpoint
const pokemonListURL = 'https://pokeapi.co/api/v2/pokemon?limit=893'; 
const pokemonInfoURL = 'https://pokeapi.co/api/v2/pokemon/';
const speciesInfoURL = 'https://pokeapi.co/api/v2/pokemon-species/';



export const getPokemon = () => {
    return (dispatch) => {
        const cachedData = localStorage.getItem('pokemon-list-data')
        if(cachedData) {
            dispatch({
                type: 'POKEMON_LIST_DATA',
                payload: JSON.parse(cachedData)
            })
        }
        else {
            return axios.get(pokemonListURL)
            .then((response) => {
                return response.data.results;
            })
            .then((data) => {
                dispatch({
                    type: 'POKEMON_LIST_DATA',
                    payload: data
                })
                const dataString = JSON.stringify(data)
                localStorage.setItem('pokemon-list-data',dataString)
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
            return response.data;
        })
        .then((data) => {
            dispatch({
                type: 'POKEMON_INFO_DATA',
                payload: data
            })
        }) 
    }
}

export const getSpeciesInfo = (name) => {
    return (dispatch) => {
        return axios.get(speciesInfoURL + name)
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            dispatch({
                type: 'POKEMON_SPECIES_DATA',
                payload: data
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
