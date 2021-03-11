import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { renderLoading } from '../Loading';

import PokemonList from './PokemonList';

const AbilityInfo = () => {
    const abilityInfo = useSelector(state => state.abilityInfo);
    const loading = useSelector((state => state.loading));

    // Renders the most up-to-date flavor text
    const renderFlavorText = () => {
        const { flavor_text_entries } = abilityInfo;
        let chosenText = '';
        flavor_text_entries.forEach((flavor) => {
            if (flavor.language.name === 'en') chosenText = flavor.flavor_text
        });
        return (
            <>
                <p className="ability-text">{chosenText}</p>
            </>
        )
    }

    // Renders the most up-to-date effect text
    const renderEffectText = () => {
        const { effect_entries } = abilityInfo;
        let chosenText = '';
        effect_entries.forEach((entry) => {
            if (entry.language.name === 'en') chosenText = entry.effect;
        });
        return (
            <>
                <p className="ability-text">{chosenText}</p>
            </>
        )
    }

    // Renders all the information
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
                    <PokemonList />
                </div>
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