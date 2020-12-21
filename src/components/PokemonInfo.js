import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

const PokemonInfo = () => {
    const info = useSelector((state => state.info))
    
    const renderSprites = () => {
        console.log(info)
        let frontShiny = null
        let frontSprite = info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']
        if(frontSprite) {
            frontShiny =  info['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_shiny']
        }
        else {
            frontSprite = info['sprites']['versions']['generation-viii']['icons']['front_default']
        }
        
        return (
            <>
                <div className="images">
                    <img src={`${frontSprite}`} alt="sprite"/>
                    {frontShiny && 
                    <img src={`${frontShiny}`} alt="sprite"/>
                    }
                </div>
                
            </>
        )
        
    }


    return (
        <div className="pokemon-info">
            <h1 className="name">{info.name.toUpperCase()}</h1>
            {renderSprites()}
        </div>
    )
}

export default PokemonInfo;