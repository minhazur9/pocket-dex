import axios from 'axios';
import { POKEMON_LIST_DATA } from './types.js';

export const getPokemon = () => {
    return (dispatch) => {
        return axios.get('https://pokeapi.co/api/v2/pokemon?limit=893')
            .then(response => {
                return response.data.results
            })
            .then(data => {
                dispatch({
                    type: POKEMON_LIST_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

