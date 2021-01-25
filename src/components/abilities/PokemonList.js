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
        const pokemonName = pokemon.replace('gmax','gigantamax')
        .replace('galar','galarian')
        .replace('alola','alolan')
        return (
            <img src={`https://img.pokemondb.net/artwork/${pokemonName}.jpg`} alt={pokemonName}/>
        )
    }

    const nameFormatter = (pokemon) => {
            if(pokemon.includes('gmax')) {
                pokemon = pokemon.replace('-gmax',' gigantamax').split(' ')
            }
            else if(pokemon.includes('alola')) {
                pokemon = pokemon.replace('-alola',' alolan').split(' ')
            }
            else if(pokemon.includes('galar')) {
                pokemon = pokemon.replace('-galar',' galarian').split(' ')
            }
            else {
                pokemon = pokemon.split('-')   
            }
            const temp = pokemon[1];
            pokemon[1] = pokemon[0];
            pokemon[0] = temp;
            pokemon = pokemon.join(' ')
            return pokemon;
    }
    

    const renderCards = () => {
        const pokemon = abilityInfo.pokemon;
        return pokemon.map((entry) => {
            const pokemonName = entry.pokemon.name;
            const formattedName = pokemonName.includes('-') ? nameFormatter(entry.pokemon.name) : entry.pokemon.name;
            if(pokemonName.includes('-totem')) return;
            return (
                <div key={pokemonName} className="pokemon-ability-card" onClick={() => updatePokemonState(pokemonName)}>
                    {renderImage(pokemonName)}
                    <p className="name">{formattedName.toUpperCase()}</p> 
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