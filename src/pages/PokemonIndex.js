import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getPokemon } from '../actions';


const PokemonIndex = () => {
    const pokemon = useSelector(state => state.pokemon)

    const select = (e) => {
       const buttons = document.querySelectorAll(".pokemon-list button");
       for(let i = 0; i < buttons.length; i++) {
           buttons[i].classList.remove('selected')
       }
       e.target.classList.toggle('selected'); 
    }

    const renderPokemon = () => {
        return (
            pokemon.map((pokemon,index) => {
                return  <button onClick={select} key={index} className="pokemon-item">
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