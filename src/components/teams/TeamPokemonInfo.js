import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import { getPokemon, getTeamPokemonInfo } from '../../actions';
import { editPokemonMutation, getTeamsQuery } from '../../queries/teamQueries';
import Select from 'react-select';
import { getCookie } from '../../App';

// General Pokemon Information
const TeamPokemonInfo = () => {

    const token = getCookie();
    const dispatch = useDispatch();
    const teamPokemonInfo = useSelector(state => state.teamPokemonInfo);
    console.log(teamPokemonInfo.name)
    const pokemonList = useSelector(state => state.pokemon);
    const [pokemon, setPokemon] = useState("");
    const [editPokemon] = useMutation(editPokemonMutation);

    useEffect(() => {
        dispatch(getPokemon())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPokemon(teamPokemonInfo.name)
    }, [teamPokemonInfo])

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

    const pokemonOptions = () => {
        return pokemonList.map((pokemon) => {
            const { name } = pokemon;
            return { value: name, label: name.toUpperCase() }
        })
    }

    const handlePokemonChange = (e) => {
        console.log(e.target)
        // setPokemon(e.target)
    }


    return (
        <div className="team-pokemon-info">
            <form onSubmit={handleSubmit}>
                <Select
                    options={pokemonOptions()}
                    value={{value:pokemon,label:pokemon.toUpperCase()}}
                    onChange={(option) => setPokemon(option.value)}
                />
                <button className="waves-effect waves-light btn green darken-3 confirm-edit">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;