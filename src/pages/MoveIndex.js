import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getMoves, getMoveInfo, startLoading, stopLoading } from '../actions';

const MoveIndex = () => {
    const dispatch = useDispatch()
    const moves = useSelector(state => state.moves)

    // Highlights selection and changes info to selected move's
    const select = (e) => {
        highight(e)
        updateInfo(e.target.id)
    }

    const highight = (e) => {
        const highlighted = e.target.classList.contains("selected")
        if(highlighted) return;
        const buttons = document.querySelectorAll(".list button");
        buttons.forEach((button) => {
            button.classList.remove('selected')
        });
        e.target.classList.toggle('selected');
     }

     // Changes info
    const updateInfo = async(move) => {
        dispatch(startLoading())
        await dispatch(getMoveInfo(move))
        dispatch(stopLoading())
    }

    const renderMoves = () => {
        return moves.map((move) => {
            const moveName = move.name.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
            .join(' ');
            return (
                <button id={move.name} onClick={select} key={move.name}>
                        {moveName.toUpperCase()}
                    </button>
            )
        })
    }

    // Gets all the moves
    useEffect(() => {
        dispatch(getMoves())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="move-index">
            <div className="input-field">
            {/* <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/> */}
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderMoves()}
            </div>
            {/* {info && 
            <PokemonInfo/>
            }      */}
        </div>
        
    )
}

export default MoveIndex;