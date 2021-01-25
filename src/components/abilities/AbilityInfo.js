import React from 'react';
import { useSelector } from 'react-redux';

const AbilityInfo = () => {
    const abilityInfo = useSelector(state => state.abilityInfo);
    const loading = useSelector((state => state.loading))

    
    const renderFlavorText = () => {
        const text = abilityInfo.flavor_text_entries;
        let chosenText = '';
        text.forEach((flavor) => {
            if (flavor.language.name === 'en') chosenText = flavor.flavor_text
        });
        return (
            <>
                <p className="ability-text">{chosenText}</p>
            </>
        )
    }

    const renderEffectText = () => {
        const text = abilityInfo.effect_entries;
        let chosenText = '';
        text.forEach((entry) => {
            if (entry.language.name === 'en') chosenText = entry.effect;
        });
        return (
            <>
                <p className="ability-text">{chosenText}</p>
            </>
        )
    }

    const renderAvailablePokemon = () => {
        const pokemon = abilityInfo.pokemon;
        return pokemon.map((entry) => {
            return (
                <div key={entry.pokemon.name} className="pokemon-ability-card">
                    <img src={`https://img.pokemondb.net/artwork/${entry.pokemon.name}.jpg`} alt={entry.pokemon.name}/>
                    <p className="name">{entry.pokemon.name}</p> 
                </div>
            )
        })
    }

    const renderAllInfo = () => {
        return (
            <>
            <h1 className="name">{abilityInfo.name.toUpperCase()}</h1>
            <div className="col2">
            {renderFlavorText()}
            </div>
            <div className="col3">
                Effect
            </div>
            <div className="col4">
            {renderEffectText()}
            </div>
            <div className="col5">
                Pokemon that have this ability
            </div>
            <div className="col6">
            {renderAvailablePokemon()}
            </div>
            </>
        )
    }

    const renderLoading = () => {
        return (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    return (
        <div className="ability-info">
            { loading ? renderLoading() : renderAllInfo()}
        </div>
    )
}

export default AbilityInfo;