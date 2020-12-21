import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getPokemon } from '../actions';


const PokemonIndex = () => {
    const pokemon = useSelector(state => state.pokemon)

    const renderPokemon = () => {
        return (
            pokemon.map((pokemon,index) => {
                return  <button key={index} className="pokemon-item">
                            {pokemon.name.toUpperCase()}
                        </button>
            })
        )
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemon())
    },[])

    return (
        <div className="pokemon-index">
            <div className="pokemon-list">
                {renderPokemon()}
            </div>
            
        </div>
    )
}

export default PokemonIndex;