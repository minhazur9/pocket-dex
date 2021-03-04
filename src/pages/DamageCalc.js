import React, { useEffect, useState } from 'react';
import {getPokemon} from '../actions';
import {pokemonOptions} from '../options/options'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const DamageCalc = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemon);
    const [pokemon1,setPokemon1] = useState("");
    const [pokemon2,setPokemon2] = useState("");


    useEffect(() => {
        dispatch(getPokemon())
    },[])

    return (
        <div className="damage-calc-page">
            <div className="set-damage-vars">
                <h3>Pokemon 1</h3>
                <label htmlFor="name">Pokemon</label>
                <Select
                    options={pokemonOptions(pokemonList)}
                    value={{ value: pokemon1 || '', label: (pokemon1 && pokemon1.toUpperCase()) || '' }}
                    onChange={(option) => setPokemon1(option.value)}
                    className='pokemon-select'
                    isSearchable
                />
            </div>
            <div className="set-damage-vars">
                <h3>Pokemon 2</h3>
                <label htmlFor="name">Pokemon</label>
                <Select
                    options={pokemonOptions(pokemonList)}
                    value={{ value: pokemon2 || '', label: (pokemon2 && pokemon2.toUpperCase()) || '' }}
                    onChange={(option) => setPokemon2(option.value)}
                    className='pokemon-select'
                    isSearchable
                />
            </div>
            <div className="set-damage-vars">
                <h3>Field</h3>
            </div>
        </div>
    )
}

export default DamageCalc;