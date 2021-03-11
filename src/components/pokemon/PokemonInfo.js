import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderLoading } from '../Loading';
import { getAbilityInfo, startLoading, stopLoading } from '../../actions';
import { useHistory } from 'react-router';
import { typeTable } from '../tables/TypeTable'
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
                <li key={index}><img src={typeTable[type.type.name].icon} alt={type.type.name} className="type" /></li>
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
        let backgroundColor = typeTable[info['types'][0]['type']['name']]['color'];
        if (backgroundColor === '#B7B1A3' && info.types.length > 1) backgroundColor = typeTable[info['types'][1]['type']['name']]['color']
        return (
            <>
                <p className="text" style={{ backgroundColor: backgroundColor }} >{chosenText}</p>
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