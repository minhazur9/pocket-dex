import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo, getSpeciesInfo } from '../../actions'

const AlternativeForms = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);
    const dispatch = useDispatch();

    // Formats the name into readable format
    const nameFormatter = (pokemon) => {
        pokemon = pokemon.split('-');
        const temp = pokemon[0];
        pokemon[0] = pokemon[1]
        pokemon[1] = temp;
        pokemon = pokemon.join(' ');
        return pokemon;
    }

    // Formats the name for images
    const imageNameFormatter = (pokemon) => {
        if (pokemon.includes('gmax')) {
            pokemon = pokemon.replace('gmax', ' gigantamax').split(' ')
        }
        else if (pokemon.includes('alola')) {
            pokemon = pokemon.replace('alola', ' alolan').split(' ')
        }
        else if (pokemon.includes('galar')) {
            pokemon = pokemon.replace('galar', ' galarian').split(' ')
        }
        else {
            pokemon = pokemon.split('')
        }
        pokemon = pokemon.join('')
        return pokemon;
    }

    // updates the pokemon info state when clicked
    const updatePokemonState = (e, pokemonName) => {
        dispatch(getInfo(pokemonName))
        dispatch(getSpeciesInfo(pokemonName))
    }

    // Renders all the forms
    const renderForms = () => {
        const { varieties } = speciesInfo;
        return varieties.map((form,index) => {
            let { name } = form.pokemon
            let captionName = name;
            if (name.includes('-totem') ||
                name.includes('-cap') ||
                name.includes('-cosplay') ||
                name.includes('-phd') ||
                name.includes('-pop-star') ||
                name.includes('-belle') ||
                name.includes('rock-star') ||
                name.includes('-libre')) return <></>;
            if (name.includes('-')) {
                name = imageNameFormatter(name)
                captionName = nameFormatter(name)
            }
            if (name.includes('necrozma-dusk')) {
                name += '-mane'
            }
            else if (name.includes('-dawn')) {
                name += '-wings'
            }
            else if (name.includes('-own-tempo')) {
                name = 'rockruff'
            }
            return (
                <li key={captionName+index} className="form" onClick={(e) => updatePokemonState(e, form.pokemon.name)} >
                    {<img src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt={name} />}
                    <p>{captionName.toUpperCase()}</p>
                </li>
            )

        })
    }

    return (
        <div className="row4">
            <p className="form-list-header">Alternate Forms</p>
            <ul className="form-line">
                {speciesInfo && renderForms()}
            </ul>
        </div>
    )
}

export default AlternativeForms;