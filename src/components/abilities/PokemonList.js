import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {getEvolutionChain, getInfo, getSpeciesInfo, startLoading, stopLoading} from '../../actions';

const PokemonList = () => {
    const abilityInfo = useSelector(state => state.abilityInfo)
    const speciesInfo = useSelector(state => state.speciesInfo)
    const dispatch = useDispatch();
    const history = useHistory();

    const renderImage = (pokemon) => {
        return (
            <img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} alt={pokemon.name}/>
        )
    }
    

    const renderCards = () => {
        const pokemon = abilityInfo.pokemon;
        return pokemon.map((entry) => {
            const pokemonName = entry.pokemon.name;
            return (
                <div key={pokemonName} className="pokemon-ability-card" onClick={() => updatePokemonState(pokemonName)}>
                    {renderImage(entry.pokemon)}
                    <p className="name">{pokemonName.toUpperCase()}</p> 
                    <p className="is-hidden">Hidden Ability:{entry.is_hidden.toString().toUpperCase()}</p>
                </div>
            )
        })
    }

    const updatePokemonState = async (pokemonName) => {
        dispatch(startLoading())
        dispatch(getInfo(pokemonName))
        await dispatch(getSpeciesInfo(pokemonName))
        await dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
        await history.push("/pokemon")
        dispatch(stopLoading())
    }

    return (
        <>
        {renderCards()}
        </>
    )

}

export default PokemonList;