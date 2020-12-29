import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getInfo, getPokemon, getSpeciesInfo, searchPokemon, startLoading, stopLoading, getMoves } from '../actions';

const MoveIndex = () => {
    const dispatch = useDispatch()

    // Gets all the moves
    useEffect(() => {
        dispatch(getMoves())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="pokemon-index">
            <div className="input-field">
            <input id="icon_prefix" type="text" className="validate"/>
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="pokemon-list">

            </div>    
        </div>
        
    )
}

export default MoveIndex;