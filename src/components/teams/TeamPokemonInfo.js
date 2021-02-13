import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../actions';

// General Pokemon Information
const TeamPokemonInfo = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemon) 
    
    useEffect(() => {
        dispatch(getPokemon())
    },[])
 
    const renderPokemonOptions = () => {
        return pokemonList.map((pokemon) => {
            const { name } = pokemon;
            return (
                <option key={name} value="">{name.toUpperCase()}</option>
            )
        })
    }

    return (
        <div className="team-pokemon-info">
            <form action="">
                <select name="pokemon-select" id="pokemon-select">
                    {renderPokemonOptions()}
                </select>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;