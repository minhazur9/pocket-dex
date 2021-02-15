import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import { getPokemon, getTeamPokemonInfo } from '../../actions';
import { editPokemonMutation, getTeamsQuery } from '../../queries/teamQueries';
import { getCookie } from '../../App';

// General Pokemon Information
const TeamPokemonInfo = () => {

    const token = getCookie();
    const dispatch = useDispatch();
    const teamPokemonInfo = useSelector(state => state.teamPokemonInfo);
    const pokemonList = useSelector(state => state.pokemon);
    const [pokemon, setPokemon] = useState("");
    const [editPokemon] = useMutation(editPokemonMutation);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id } = teamPokemonInfo;
        console.log(pokemon, id)
        editPokemon({
            variables: {
                name: pokemon,
                id,
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token,
                    }
                }
            ]
        })
    }
    return (
        <div className="team-pokemon-info">
            <form onSubmit={handleSubmit}>
                <select name="pokemon-select" id="pokemon-select" onChange={(e) => setPokemon(e.target.value)}>
                    {renderPokemonOptions()}
                </select>
                <button className="waves-effect waves-light btn green darken-3">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;