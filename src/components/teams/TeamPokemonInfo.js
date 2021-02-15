import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import { getPokemon } from '../../actions';
import { editPokemonMutation } from '../../queries/teamQueries';

// General Pokemon Information
const TeamPokemonInfo = (props) => {
    const dispatch = useDispatch();
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
                <option key={name} id={name} value={name}>{name.toUpperCase()}</option>
            )
        })
    }

    const handleSubmit = (e) => {
        const id = e.target.id;
        editPokemon({
            variables: {
                name: pokemon,
                id,
            }
        })
    }
    console.log(props.id)

    return (
        <div className="team-pokemon-info">
            <form>
                <select name="pokemon-select" id="pokemon-select" onChange={(e) => setPokemon(e.target.value)}>
                    {renderPokemonOptions()}
                </select>
                <button className="waves-effect waves-light btn green darken-3">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;