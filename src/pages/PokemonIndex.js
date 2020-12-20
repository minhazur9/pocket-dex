import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getPokemon } from '../actions';


const PokemonIndex = () => {

    const renderPokemon = () => {
        return (
            pokemon.map((pokemon,index) => {
                return <li key={index}>{pokemon.name}</li>
            })
        )
    }


    const pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemon())
    },[])

    return (
        <div className="pokemon-index">
            {renderPokemon()}
        </div>
    )
}

export default PokemonIndex;