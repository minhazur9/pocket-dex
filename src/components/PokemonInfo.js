import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

const PokemonInfo = () => {
    const info = useSelector((state => state.info))

    const renderSprites = () => {
        console.log(info)
    }

    useEffect(() => {
        renderSprites()
    },[])


    return (
        <div className="pokemon-info">
            <h1 className="name">{info.name.toUpperCase()}</h1>
        </div>
    )
}

export default PokemonInfo;