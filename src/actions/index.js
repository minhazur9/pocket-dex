import axios from 'axios';

// Pokemon Endpoint
const pokemonListURL = 'https://pokeapi.co/api/v2/pokemon?limit=893'; 



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
                return response.data.results
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