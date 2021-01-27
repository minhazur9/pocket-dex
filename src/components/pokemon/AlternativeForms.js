import React from 'react';
import { useSelector} from 'react-redux';

const AlternativeForms = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);

    const nameFormatter = (pokemon) => {
        pokemon = pokemon.split('-');
        const temp = pokemon[0];
        pokemon[0] = pokemon[1]
        pokemon[1] = temp;
        pokemon = pokemon.join(' ');
        return pokemon;
    }

    const imageNameFormatter = (pokemon) => {
        if(pokemon.includes('gmax')) {
            pokemon = pokemon.replace('gmax',' gigantamax').split(' ')
        }
        else if(pokemon.includes('alola')) {
            pokemon = pokemon.replace('alola',' alolan').split(' ')
        }
        else if(pokemon.includes('galar')) {
            pokemon = pokemon.replace('galar',' galarian').split(' ')
        }
        else {
            pokemon = pokemon.split('')
        }
        pokemon = pokemon.join('')
        return pokemon;
    }

    const renderForms = () => {
        const {varieties} = speciesInfo;
        return varieties.map((form) => {
            let {name} = form.pokemon
            let captionName = name;
            if(name.includes('-totem')) return <></>;
            if(name.includes('-')) {
                name = imageNameFormatter(name)
                captionName = nameFormatter(name)
            }
            return (
                <li key={name} className="form">
                    <img src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt={name}/>
                    <p>{captionName.toUpperCase()}</p>
                </li>
            )
            
        })
    }

    return (
        <div className="row4">
        <p className="form-list-header">Alternate Forms</p>
        <ul className="form-line">
        {renderForms()}
        </ul>
        </div>
    )
}

export default AlternativeForms;