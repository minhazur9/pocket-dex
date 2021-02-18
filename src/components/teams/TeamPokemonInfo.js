import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import { getPokemon, getTeamPokemonInfo } from '../../actions';
import { editPokemonMutation, getTeamsQuery, getPokemonQuery } from '../../queries/teamQueries';
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

    const natureOptions = [
        {value:'hardy',label:'Hardy'},
        {value:'lonely',label:'Lonely'},
        {value:'adamant',label:'Adamant'},
        {value:'naughty',label:'Naughty'},
        {value:'brave',label:'Brave'},
        {value:'bold',label:'Bold'},
        {value:'docile',label:'Docile'},
        {value:'impish',label:'Impish'},
        {value:'lax',label:'Lax'},
        {value:'relaxed',label:'Relaxed'},
        {value:'modest',label:'Modest'},
        {value:'mild',label:'Mild'},
        {value:'bashful',label:'Bashful'},
        {value:'rash',label:'Rash'},
        {value:'calm',label:'Calm'},
        {value:'gentle',label:'Gentle'},
        {value:'quiet',label:'Quiet'},
        {value:'careful',label:'Careful'},
        {value:'quirky',label:'Quirky'},
        {value:'sassy',label:'Sassy'},
        {value:'timid',label:'Timid'},
        {value:'hasty',label:'Hasty'},
        {value:'jolly',label:'Jolly'},
        {value:'naive',label:'Naive'},
        {value:'serious',label:'Serious'},
        
    ]

    useEffect(() => {
        dispatch(getPokemon())
        setPokemon(teamPokemonInfo.name)
        setLevel(teamPokemonInfo.level)
    }, [teamPokemonInfo])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id } = teamPokemonInfo;
        editPokemon({
            variables: {
                name: pokemon,
                level: Number(level),
                id,
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token,
                    }
                },
                {
                    query: getPokemonQuery,
                    variables: {
                        id
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
                    className='pokemon-select'
                    isSearchable
                />
                <label htmlFor="level">Level</label>
                <input type="number" min='1' max='100' value={level} onChange={(e) => setLevel(e.target.value)}/>
                {levelVerificationError()}
                <label htmlFor="nature-select">Nature</label>
                <Select
                    options={natureOptions}
                    // value={{value:pokemon,label:pokemon && pokemon.toUpperCase() || '' }}
                    // onChange={(option) => setPokemon(option.value)}
                    isSearchable
                    className='nature-select'
                />
                <button className="waves-effect waves-light btn green darken-3 confirm-edit">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;