import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../actions';

// General Pokemon Information
const TeamPokemonInfo = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemon)
    const [pokemon, setPokemon] = useState("");

    useEffect(() => {
        dispatch(getPokemon())
        // eslint-disable-next-line
    }, [])

    const renderPokemonOptions = () => {
        return pokemonList.map((pokemon) => {
            const { name } = pokemon;
            return (
                <option key={name} value={name}>{name.toUpperCase()}</option>
            )
        })
    }

    return (
        <div className="team-pokemon-info">
            <form>
                <select name="pokemon-select" id="pokemon-select" onChange={(e) => setPokemon(e.target.value)}>
                    {renderPokemonOptions()}
                </select>
                <a className="waves-effect waves-light btn green darken-3">Confirm</a>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;