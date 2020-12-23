import React from 'react';
import { useSelector} from 'react-redux';

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


    return (
        <div className="pokemon-info">
            <h1 className="name">{info.name.toUpperCase()}</h1>
            <div className="col2">
                {renderPokemonId()}
                {renderSprites()}
            </div>
                     
        </div>
    )
}

export default PokemonInfo;