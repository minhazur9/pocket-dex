import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo, getPokemon, getSpeciesInfo, searchPokemon, startLoading, stopLoading } from '../actions';
import PokemonInfo from '../components/pokemon/PokemonInfo';


const PokemonIndex = () => {
    const pokemon = useSelector(state => state.pokemon)
    const info = useSelector(state => state.info)
    const dispatch = useDispatch()

    // Highlights selection and changes info to selected pokemon's
    const select = (e) => {
        highight(e)
        updateInfo(e.target.id)
    }

    // Changes the Pokemon depending on what is typed
    const search = (e) => {
        dispatch(searchPokemon(e.target.value.replace(" ","-").toLowerCase()))
    }


    // Highlights selected element
    const highight = (e) => {
        const highlighted = e.target.classList.contains("selected")
        if (highlighted) return;
        const buttons = document.querySelectorAll(".list button");
        buttons.forEach((button) => {
            button.classList.remove('selected')
        });
        e.target.classList.toggle('selected');
    }

    const nameFormatter = (name) => {
        return name.replace(/-.*/,'');
    }

    // Changes info
    const updateInfo = async (name) => {
        dispatch(startLoading())
        await dispatch(getSpeciesInfo(nameFormatter(name)))
        dispatch(getInfo(name))
        dispatch(stopLoading())
    }

    // Renders the pokemon list
    const renderPokemon = () => {
        return pokemon.map((pokemon) => {
                return (
                    <button id={pokemon.name} onClick={select} key={pokemon.name}>
                        {pokemon.name.toUpperCase()}
                    </button>
                )
            })
    }

    // Gets all the pokemon
    useEffect(() => {
        dispatch(getPokemon())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="pokemon-index">
            <div className="input-field">
                <input onKeyUp={search} id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderPokemon()}
            </div>
            {info &&
                <PokemonInfo />
            }
        </div>

    )
}

export default PokemonIndex;