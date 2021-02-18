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
    const pokemonList = useSelector(state => state.pokemon);
    const [pokemon, setPokemon] = useState('bulbasaur');
    const [level, setLevel] = useState('1');
    const [editPokemon] = useMutation(editPokemonMutation);

    useEffect(() => {
        dispatch(getPokemon())
        setPokemon(teamPokemonInfo.name)
        setLevel(teamPokemonInfo.level)
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
            const name = pokemon.name;
            return { value: name, label: name.toUpperCase() }
        })
    }

    const levelVerificationError = () => {
        console.log(Number(level))
        if (Number(level) < 1 || Number(level) > 100) {
            return <p className="error-message">Invalid Level</p>
        }
    }

    return (
        <div className="team-pokemon-info">
            <form onSubmit={handleSubmit}>
                <label htmlFor="pokemon-select">Pokemon</label>
                <Select
                    options={pokemonOptions()}
                    value={{value:pokemon,label:pokemon && pokemon.toUpperCase() || '' }}
                    onChange={(option) => setPokemon(option.value)}
                    isSearchable
                />
                <label htmlFor="level">Level</label>
                <input type="number" min='1' max='100' defaultValue='1' onChange={(e) => setLevel(e.target.value)}/>
                {levelVerificationError()}
                <button className="waves-effect waves-light btn green darken-3 confirm-edit">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;