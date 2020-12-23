import React from 'react';
import { useSelector} from 'react-redux';
import bug from '../images/types/bug.png'
import dark from '../images/types/dark.png'
import dragon from '../images/types/dragon.png'
import electric from '../images/types/electric.png'
import fairy from '../images/types/fairy.png'
import fighting from '../images/types/fighting.png'
import fire from '../images/types/fire.png'
import flying from '../images/types/flying.png'
import ghost from '../images/types/ghost.png'
import grass from '../images/types/grass.png'
import ground from '../images/types/ground.png'
import ice from '../images/types/ice.png'
import normal from '../images/types/normal.png'
import poison from '../images/types/poison.png'
import psychic from '../images/types/psychic.png'
import rock from '../images/types/rock.png'
import steel from '../images/types/steel.png'
import water from '../images/types/water.png'

const PokemonInfo = () => {
    

    const info = useSelector((state => state.info))
    
    // Renders the pokemon sprites
    const renderSprites = () => {
        let frontShiny = null
        let frontSprite = info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']
        if(frontSprite) {
            frontShiny =  info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_shiny']
        }
        else {
            frontSprite = info['sprites']['versions']['generation-viii']['icons']['front_default']
        }
        return (
                <div className="sprites">
                    <img src={`${frontSprite}`} alt="sprite"/>
                    {frontShiny && 
                    <img src={`${frontShiny}`} alt="sprite"/>
                    }
                </div>  
        )  
    }

    const renderPokemonId = () => {
        return (
            <p className="pokemon-id">#{info.id}</p>
        )
    }
    
    const renderTypes = () => {
        const types = info.types;
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
        return types.map((type) => {
            return (
                <li><img src={typeTable[type.type.name]} alt={type.type.name} className="type"/></li>
            )
        }) 
    }


    return (
        <div className="pokemon-info">
            <h1 className="name">{info.name.toUpperCase()}</h1>
            <div className="col2">
                {renderPokemonId()}
                {renderSprites()}
            <div className="types">
                <ul className="type-list">
                <p className="type-header">Types</p>
                    {renderTypes()}
                </ul>
                
            </div>
            </div>
                     
        </div>
    )
}

export default PokemonInfo;