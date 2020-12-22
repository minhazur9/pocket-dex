import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getInfo, getPokemon } from '../actions';
import PokemonInfo from '../components/PokemonInfo';


const PokemonIndex = () => {
    const pokemon = useSelector(state => state.pokemon)
    const info = useSelector(state => state.info)
    const dispatch = useDispatch()
    
    const select = (e) => {
        highight(e)
        updateInfo(e.target.id)
    }

    const highight = (e) => {
       const highlighted = e.target.classList.contains("selected")
       if(highlighted) return;
       const buttons = document.querySelectorAll(".pokemon-list button");
       for(let i = 0; i < buttons.length; i++) {
           buttons[i].classList.remove('selected')
       }
       e.target.classList.toggle('selected');
    }

    const updateInfo = (id) => {
        dispatch(getInfo(id))
    }

    const renderPokemon = () => {
        return (
            pokemon.map((pokemon,index) => {
                return  <button id={index+1} onClick={select} key={index}>
                            {pokemon.name.toUpperCase()}
                        </button>
            })
        )
    }

    useEffect(() => {
        dispatch(getPokemon())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="pokemon-index">
            <div className="pokemon-list">
                {renderPokemon()}
            </div>
            {info && 
            <PokemonInfo/>
            }     
        </div>
        
    )
}

export default PokemonIndex;