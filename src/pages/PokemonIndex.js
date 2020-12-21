import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getInfo, getPokemon } from '../actions';


const PokemonIndex = () => {
    const pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch()

    const select = (e) => {
       const buttons = document.querySelectorAll(".pokemon-list button");
       for(let i = 0; i < buttons.length; i++) {
           buttons[i].classList.remove('selected')
       }
       e.target.classList.toggle('selected');
       renderInfo(); 
    }

    const renderInfo = () => {
        dispatch(getInfo())
    }

    // const renderImages = () => {

    // }

    const renderPokemon = () => {
        return (
            pokemon.map((pokemon,index) => {
                return  <button id={index+1} onClick={select} key={index} className="pokemon-item">
                            {pokemon.name.toUpperCase()}
                        </button>
            })
        )
    }

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