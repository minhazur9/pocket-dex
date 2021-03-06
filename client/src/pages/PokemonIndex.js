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
        highlight(e)
        updateInfo(e.target.id)
    }

    // Changes the Pokemon depending on what is typed
    const search = (e) => {
        dispatch(searchPokemon(e.target.value.replace(" ", "-").toLowerCase()))
        if (e.keyCode === 13) updateInfo(document.querySelector(".list button").id)
    }


    // Highlights selected element
    const highlight = (e) => {
        const highlighted = e.target.classList.contains("selected")
        if (highlighted) return;
        const buttons = document.querySelectorAll(".list button");
        buttons.forEach((button) => {
            button.classList.remove('selected')
        });
        e.target.classList.toggle('selected');
    }

    // Formats name to readable format
    const nameFormatter = (name) => {
        if (!(name.includes('-f') || name.includes('m'))) return name.replace(/-.*/, '');
        if (name.includes('meowstic')) return 'meowstic';
        return name
    }
    // Formats name for images
    const listNameFormatter = (pokemon) => {
        pokemon = pokemon.split('-')
        const temp = pokemon[1];
        pokemon[1] = pokemon[0];
        pokemon[0] = temp;
        pokemon = pokemon.join(' ')
        return pokemon;
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
            let { name } = pokemon;
            if (name.includes('-')) name = listNameFormatter(name)
            return (
                <button id={pokemon.name} onClick={select} key={name}>
                    {name.toUpperCase()}
                </button>
            )
        })
    }

    // Gets all the pokemon
    useEffect(() => {
        const abortCont = new AbortController();
        dispatch(getPokemon())
        return () => abortCont.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="pokemon-index">
            <div className="input-field">
                <input onKeyUp={search} id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="layout">
                <div className="list">
                    {renderPokemon()}
                </div>
                {info && <PokemonInfo />}
            </div>
        </div>

    )
}

export default PokemonIndex;