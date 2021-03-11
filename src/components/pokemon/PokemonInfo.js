import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderLoading } from '../Loading';
import { getAbilityInfo, startLoading, stopLoading } from '../../actions';
import { useHistory } from 'react-router';

import bug from '../../images/types/bug.png'
import dark from '../../images/types/dark.png'
import dragon from '../../images/types/dragon.png'
import electric from '../../images/types/electric.png'
import fairy from '../../images/types/fairy.png'
import fighting from '../../images/types/fighting.png'
import fire from '../../images/types/fire.png'
import flying from '../../images/types/flying.png'
import ghost from '../../images/types/ghost.png'
import grass from '../../images/types/grass.png'
import ground from '../../images/types/ground.png'
import ice from '../../images/types/ice.png'
import normal from '../../images/types/normal.png'
import poison from '../../images/types/poison.png'
import psychic from '../../images/types/psychic.png'
import rock from '../../images/types/rock.png'
import steel from '../../images/types/steel.png'
import water from '../../images/types/water.png'
import StatChart from './StatChart';
import MoveSetList from './MoveSetList';
import EvolutionChain from './EvolutionChain';
import AlternativeForms from './AlternativeForms';



// General Pokemon Information
const PokemonInfo = () => {

    const info = useSelector((state => state.info));
    const loading = useSelector((state => state.loading));
    const speciesInfo = useSelector(state => state.speciesInfo);
    const dispatch = useDispatch();
    const history = useHistory();

    // Hash table for converting pokemon type strings to image
    const typeTable = {
        bug: bug,
        dark: dark,
        dragon: dragon,
        electric: electric,
        fairy: fairy,
        fighting: fighting,
        fire: fire,
        flying: flying,
        ghost: ghost,
        grass: grass,
        ground: ground,
        ice: ice,
        normal: normal,
        poison: poison,
        psychic: psychic,
        rock: rock,
        steel: steel,
        water: water
    }

    // Renders the pokemon sprites
    const renderSprites = () => {
        let frontShiny = null
        let frontSprite = info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']
        if (frontSprite) {
            frontShiny = info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_shiny']
        }
        else {
            frontSprite = info['sprites']['versions']['generation-viii']['icons']['front_default']
        }
        return (
            <div className="sprites">
                <img src={`${frontSprite}`} alt="sprite" />
                {frontShiny &&
                    <img src={`${frontShiny}`} alt="sprite" />
                }
            </div>
        )
    }

    // Puts the name to readable format
    const nameFormatter = (pokemon) => {
        pokemon = pokemon.split('-')
        const temp = pokemon[1];
        pokemon[1] = pokemon[0];
        pokemon[0] = temp;
        pokemon = pokemon.join(' ')
        return pokemon;
    }

    // Updates ability info state
    const updateAbilityState = async (abilityName) => {
        dispatch(startLoading())
        await dispatch(getAbilityInfo(abilityName))
        await dispatch(stopLoading())
        history.push("/abilities")
    }

    // Renders the pokemon id number
    const renderPokemonId = () => {
        return (
            <p className="pokemon-id">#{info.id}</p>
        )
    }

    // Render the pokemon types
    const renderTypes = () => {
        const types = info.types;
        return types.map((type, index) => {
            return (
                <li key={index}><img src={typeTable[type.type.name]} alt={type.type.name} className="type" /></li>
            )
        })
    }

    // Render the pokemon abilities
    const renderAbilities = () => {
        const abilities = info.abilities;
        return abilities.map((ability, index) => {
            const abilityName = ability.ability.name.split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
                .join(' ');
            return (
                <li key={index * 5} className='ability' onClick={() => updateAbilityState(ability.ability.name)}>{abilityName}</li>
            )
        });
    }

    // Render the pokemon flavor text
    const renderFlavorText = () => {
        const text = speciesInfo.flavor_text_entries;
        let chosenText = '';
        text.forEach((flavor) => {
            if (flavor.language.name === 'en') chosenText = flavor.flavor_text
        });
        return (
            <>
                <p className="text">{chosenText}</p>
            </>
        )
    }

    // Renders all the info
    const renderAllInfo = () => {
        let { name } = info;
        if (name.includes('-')) name = nameFormatter(name)
        return (
            <>
                <div className="banner">
                    <div className="left-rect"></div>
                    <h1 className="name">{name.toUpperCase()}</h1>
                    <div className="right-rect"></div>
                </div>

                <div className="row2">
                    {renderPokemonId()}
                    {renderSprites()}
                    <ul className="types">
                        <p className="type-header">Types</p>
                        {renderTypes()}
                    </ul>
                </div>
                <div className="row3">
                    <div className="base-stats">
                        <div className="stats">
                            <p className='stat-header'>Base Stats</p>
                            <ul className="stat-list">
                                <StatChart height={300} width={400} />
                            </ul>
                        </div>
                    </div>
                    <ul className="abilties">
                        <p className="ability-header">Abilties</p>
                        <div className="ability-list">
                            {renderAbilities()}
                        </div>
                        <div className="description">
                            <p>Description</p>
                            {speciesInfo && renderFlavorText()}
                        </div>
                    </ul>
                </div>
                <EvolutionChain />
                <AlternativeForms />
                <MoveSetList />
            </>
        )
    }

    return (
        <div className="pokemon-info">
            { loading ? renderLoading() : renderAllInfo()}
        </div>
    )
}

export default PokemonInfo;