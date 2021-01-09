import React from 'react';
import { useSelector } from 'react-redux';
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

// General Pokemon Information
const PokemonInfo = () => {

    const info = useSelector((state => state.info))
    const loading = useSelector((state => state.loading))
    const speciesInfo = useSelector(state => state.speciesInfo)

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
                <li key={index * 5} className='ability'>{abilityName}</li>
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
    
    // Renders loading spinner
    const renderLoading = () => {
        return (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    // Renders all the info
    const renderAllInfo = () => {
        return (
            <>
                <h1 className="name">{info.name.toUpperCase()}</h1>
                <div className="col2">
                    {renderPokemonId()}
                    {renderSprites()}
                    <ul className="types">
                        <p className="type-header">Types</p>
                        {renderTypes()}
                    </ul>
                </div>
                <div className="col3">
                    <div className="base-stats">
                        <div className="stats">Base Stats
                <ul className="stat-list">
                                <StatChart />
                            </ul>
                        </div>
                    </div>
                    <ul className="abilties">
                        <p className="ability-header">Abilties</p>
                        {renderAbilities()}
                        <div className="description">
                            <p>Description</p>
                            {renderFlavorText()}
                        </div>
                    </ul>
                </div>
                <MoveSetList />
            </>
        )
    }

    return (
        <div className="pokemon-info">
            { loading && renderLoading()}
            { !loading && renderAllInfo()}
        </div>
    )
}

export default PokemonInfo;